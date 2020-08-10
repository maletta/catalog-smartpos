import 'babel-polyfill';
import 'url-search-params-polyfill';
import 'icons';

import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import initGA from 'initGA';
import paths from 'paths';
import NotFound from 'NotFound';
import AppRouter from 'Router';
import { getStoreInfo, getCategories } from 'requests';

import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import Breadcrumb from 'containers/Breadcrumb';
import CardShop from 'components/CardShop';

import history from 'utils/history';
import getStoreName from 'utils/getStoreName';
import daysOfWeek from 'utils/daysOfWeek';

import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

import getBusinessHour from 'api/businessHoursRequests';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  top: 80px;
  padding-bottom: 80px;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState({});
  const { updateShop, categories, updateCategory } = useContext(ShopContext);
  const { updateFilter } = useContext(FilterContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);

  const getCategoryList = (data) => {
    getCategories(data.id)
      .then((response) => {
        updateCategory(response.data);
      })
      .catch(() => updateCategory([]))
      .finally(() => setLoading(false));
  };

  const today = openHours => (openHours || daysOfWeek)[moment().day()];

  const isShopClosed = (data) => {
    if (!data) {
      return true;
    }

    const { openHours, allowOrderOutsideBusinessHours } = data;

    if (openHours === null || openHours.length === 0) {
      return false;
    }

    if (allowOrderOutsideBusinessHours) {
      return false;
    }

    const { hours } = today(openHours);
    const currentHour = moment().format('HH:mm');
    const isCurrentTimeWithinTimeRange = ({ openHour, closeHour }) => openHour < currentHour
      && closeHour > currentHour;

    return !hours.some(isCurrentTimeWithinTimeRange);
  };

  const getStore = async () => {
    const storeName = getStoreName();

    try {
      const { data } = await getStoreInfo(storeName);
      const {
        allowOrderOutsideBusinessHours,
        is_enableOrder: isEnableOrder,
        fantasia,
      } = data;

      document.title = fantasia;

      setStore({ ...data, found: true, storeName });
      getCategoryList(data);

      const closeNow = isShopClosed(data);
      const isOrderEnabled = !closeNow && allowOrderOutsideBusinessHours && isEnableOrder;

      updateShop({
        ...data, today, closeNow, is_enableOrder: Number(isOrderEnabled),
      });
    } catch {
      setStore({ found: false });
      setLoading(false);
    }
  };

  const businessHourRequest = async () => {
    const date = moment().format();
    const timezone = date.substr(date.length - 6);
    const openStore = await getBusinessHour(store.id, store.codigo, timezone);
    updateShop(openStore.data);
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
    getStore();
  }, []);

  useEffect(() => {
    if (store.id && !store.allowOrderOutsideBusinessHours) {
      businessHourRequest();
    }
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initGA(history);
    cleanCart();
  }, []);

  const goHome = () => {
    history.push(paths.home);

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
      <Header
        categories={categories}
        codigo={store.codigo}
        goHome={goHome}
        atualizacao={store.atualizacao}
        store={store}
      />
      <Content pathname={history.location.pathname} className="container mb-5">
        <Breadcrumb goHome={() => goHome()} />
        <AppRouter />
      </Content>
      <Footer storeInfo={store} />
    </>
  );
};

export default App;
