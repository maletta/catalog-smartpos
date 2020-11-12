
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import moment from 'moment';

// import initGA from 'initGA';
import paths from 'paths';
import NotFound from 'NotFound';
// import AppRouter from 'Router';
import { getCategories } from 'requests';

import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import Breadcrumb from 'containers/Breadcrumb';
import CardShop from 'components/CardShop';

// import history from 'utils/history';
// import getStoreName from 'utils/getStoreName';

import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ThemeContext from 'contexts/ThemeContext';
import { useGlobalContext } from 'contexts/GlobalContext/context/hooks';
import { getStoreAction } from 'contexts/GlobalContext/actions/store';

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


function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const { updateShop, updateCategory } = useContext(ShopContext);
  const { updateFilter } = useContext(FilterContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const { theme, dispatchTheme } = useContext(ThemeContext);
  const {
    globalContext, dispatch,
  } = useGlobalContext();
  const router = useRouter();

  const defineTheme = async (storeId) => {
    const newTheme = await getTheme(storeId);
    dispatchTheme({ type: 'THEME', payload: newTheme });
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
    if (globalContext.storeContext.id) {
      const {
        is_enableOrder: isEnableOrder,
        fantasia,
        allowOrderOutsideBusinessHours,
        openHours,
      } = globalContext.storeContext;
      defineTheme(globalContext.storeContext.id);
      document.title = fantasia;
      getCategoryList(globalContext.storeContext.id);

      let customerCanOrder = isEnableOrder === 1;

      if (customerCanOrder) {
        customerCanOrder = allowOrderOutsideBusinessHours === 1;

        if (!customerCanOrder) {
          customerCanOrder = isShopOpen(openHours);
        }
      }
      updateShop({
        ...globalContext.storeContext, is_enableOrder: Number(customerCanOrder), customerCanOrder,
      });
    } else {
      setLoading(false);
    }
  };

  const businessHourRequest = async () => {
    const currentDateFormat = moment().format();
    const timezone = currentDateFormat.substr(currentDateFormat.length - 6);
    const { data } = await getBusinessHour(
      globalContext.storeContext.id, globalContext.storeContext.codigo, timezone,
    );
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
    if (globalContext.storeContext.id
      && !globalContext.storeContext.allowOrderOutsideBusinessHours) {
      businessHourRequest();
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    getStore();
    window.scrollTo(0, 0);
    // initGA(history);
    cleanCart();
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStoreAction('smartposbr'));
  }, []);

  const goHome = () => {
    router.push(paths.home);

    updateFilter({
      categoria: 0,
      label: '',
      page: 1,
      search: '',
      categoryName: 'Todas as categorias',
      redirect: true,
    });
  };

  if (loading || theme.isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (!globalContext.storeContext.found) {
    return <NotFound />;
  }


  return (
    <>
      <CardShop />
      <Header goHome={goHome} store={globalContext.storeContext} />
      <Content className="container">
        <Breadcrumb goHome={goHome} />
        {/* <AppRouter /> */}
        {children}
      </Content>
      <Footer storeInfo={globalContext.storeContext} />
    </>
  );
}


AppWrapper.defaultProps = {
  children: '',
};

AppWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppWrapper;
