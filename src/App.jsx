import 'icons';

import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';

// import initGA from 'initGA';
// import paths from 'paths';
import NotFound from 'NotFound';
import AppRouter from 'Router';
import { getStoreInfo, getCategories } from 'requests';

import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import Breadcrumb from 'containers/Breadcrumb';
import CardShop from 'components/CardShop';

// import history from 'utils/history';
import getStoreName from 'utils/getStoreName';

import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ThemeContext from 'contexts/ThemeContext';


import getBusinessHour from 'api/businessHoursRequests';
import { getTheme } from 'api/catalogCustomization';
import { isCurrentTimeWithinTimeRange } from 'utils/withinTimeRange';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const Content = styled.div`
  position: relative;
  top: 80px;
  padding-bottom: 80px;
  margin-bottom: 3rem;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState({});
  const { updateShop, updateCategory } = useContext(ShopContext);
  const { updateFilter } = useContext(FilterContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const { dispatchTheme } = useContext(ThemeContext);

  const defineTheme = async (storeId) => {
    const theme = await getTheme(storeId);
    dispatchTheme({ type: 'THEME', payload: theme });
  };

  const getCategoryList = (id) => {
    getCategories(id)
      .then(({ data }) => updateCategory(data))
      .catch(() => updateCategory([]))
      .finally(() => setLoading(false));
  };

  const isShopOpen = (openHours) => {
    const { hours, closed } = openHours[moment().day()];
    if (closed) return false;
    const fn = (openCloseHours) => {
      const { openHour, closeHour } = openCloseHours;
      return isCurrentTimeWithinTimeRange(
        { openHour, closeHour, currentHour: moment().format('HH:mm') },
      );
    };
    return hours.some(fn);
  };

  const getStore = async () => {
    const storeName = getStoreName();

    try {
      const { data } = await getStoreInfo(storeName);
      const {
        is_enableOrder: isEnableOrder,
        fantasia,
        allowOrderOutsideBusinessHours,
        openHours,
      } = data;
      defineTheme(data.id);
      document.title = fantasia;
      setStore({ ...data, found: true, storeName });
      getCategoryList(data.id);

      let customerCanOrder = isEnableOrder === 1;

      if (customerCanOrder) {
        customerCanOrder = allowOrderOutsideBusinessHours === 1;

        if (!customerCanOrder) {
          customerCanOrder = isShopOpen(openHours);
        }
      }

      updateShop({
        ...data, is_enableOrder: Number(customerCanOrder), customerCanOrder,
      });
    } catch {
      setStore({ found: false });
      setLoading(false);
    }
  };

  const businessHourRequest = async () => {
    const currentDateFormat = moment().format();
    const timezone = currentDateFormat.substr(currentDateFormat.length - 6);
    const { data } = await getBusinessHour(store.id, store.codigo, timezone);
    updateShop(data);
  };

  const cleanCart = () => {
    const date1 = localStorage.getItem('cartInit');
    const date2 = new Date().getTime();
    const hourDiff = Math.abs(date1 - date2) / 36e5;
    if (hourDiff > 1) {
      localStorage.removeItem('cartInit');
      updateShoppingCart({ cart: [] });
    }
  };

  useEffect(() => {
    if (store.id && !store.allowOrderOutsideBusinessHours) {
      businessHourRequest();
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    getStore();
    if (window) window.scrollTo(0, 0);
    // initGA(history);
    cleanCart();
    // eslint-disable-next-line
  }, []);

  const goHome = () => {
    // history.push(paths.home);

    updateFilter({
      categoria: 0,
      label: '',
      page: 1,
      search: '',
      categoryName: 'Todas as categorias',
      redirect: true,
    });
  };

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (!store.found) {
    return <NotFound />;
  }

  return (
    <>
      <CardShop />
      <Header goHome={goHome} store={store} />
      <Content className="container">
        <Breadcrumb goHome={goHome} />
        <AppRouter />
      </Content>
      <Footer storeInfo={store} />
    </>
  );
};

export default App;
