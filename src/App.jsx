import 'babel-polyfill';
import 'url-search-params-polyfill';
import React, { useState, useEffect, useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import moment from 'moment';

import GridProducts from 'containers/GridProducts';
import MainContainer from 'containers/mainContainer';
import Cart from 'containers/Cart';
import NotFound from 'NotFound';
import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import Breadcrumb from 'containers/Breadcrumb';
import SingleProduct from 'containers/SingleProduct';
import OrderPlaced from 'containers/OrderPlaced';
import RegisterData from 'containers/RegisterData';
import Address from 'containers/Address';
import Payment from 'containers/Payment';
import Conclusion from 'containers/Conclusion';

import history from 'utils/history';

import getStoreName from 'utils/getStoreName';
import formatFormErrors from 'utils/formatFormErrors';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faList,
  faTh,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faArrowRight,
  faArrowLeft,
  faCaretDown,
  faSlidersH,
  faSort,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faWhatsapp,
  faInstagram,
  faGooglePlay,
} from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { getStoreInfo, getCategories } from 'requests';

import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import getBusinessHour from './api/businessHoursRequests';

import initGA from './initGA';

library.add(
  faCheck,
  faList,
  faTh,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faFacebookF,
  faTimes,
  faGooglePlay,
  faWhatsapp,
  faInstagram,
  faHeart,
  faArrowRight,
  faArrowLeft,
  faCaretDown,
  faSlidersH,
  faSort,
);

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

  @media (max-width: 768px) {
    ${props => (props.pathname !== '/checkout' ? 'top: 105px' : 'top: 70px')};
  }
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState({});
  const { updateShop, categories, updateCategory } = useContext(ShopContext);
  const { filter, updateFilter } = useContext(FilterContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);

  const notFoundHandle = () => (loading ? (
    <Container>
      <Spinner />
    </Container>
  ) : (
    <NotFound />
  ));

  const getCategoryList = (data) => {
    getCategories(data.id)
      .then((response) => {
        updateCategory(response.data);
      })
      .catch(() => updateCategory([]))
      .finally(() => setLoading(false));
  };
  const getStore = () => {
    getStoreInfo(getStoreName())
      .then((response) => {
        const today = response.data.openHours[moment().day()];
        const verifyIsClosed = () => {
          const anyHour = response.data.allowOrderOutsideBusinessHours;
          const { hours } = today;
          const hourNow = moment().format('HH:mm');
          let isClosed = true;
          if (today.closed) {
            return true;
          }
          if (anyHour === 1) {
            return false;
          }
          hours.map((item) => {
            if (item.openHour < hourNow && item.closeHour > hourNow) {
              isClosed = false;
            }

            return !!isClosed;
          });
          return isClosed;
        };
        const closeNow = verifyIsClosed();
        document.title = response.data.fantasia;
        updateShop({ ...response.data, today, closeNow });
        setStore({ ...response.data, found: true, storeName: getStoreName() });
        getCategoryList(response.data);
      })
      .catch(() => {
        setStore({ found: false });
        setLoading(false);
      });
  };

  const BusinessHour = () => {
    if (!store.allowOrderOutsideBusinessHours) {
      const date = moment().format();
      const timezone = date.substr(date.length - 6);
      getBusinessHour(store.id, store.codigo, timezone).then((openStore) => {
        updateShop(openStore.data);
      });
    }
  };

  const cleanCart = () => {
    const date1 = localStorage.getItem('cartInit');
    const date2 = new Date().getTime();
    const hourDiff = Math.abs(date1 - date2) / 36e5;
    if (hourDiff > 1) {
      localStorage.removeItem('cartInit');
      localStorage.removeItem('cart');
      updateShoppingCart({
        basketCount: 0,
      });
    }
  };

  useEffect(() => {
    getStore();
  }, [false]);

  useEffect(() => {
    if (store.id) {
      BusinessHour();
    }
  }, [loading]);

  useEffect(() => {
    yup.setLocale(formatFormErrors());
    window.scrollTo(0, 0);
    initGA();
    cleanCart();
  }, [false]);

  const { pathname } = history.location;

  const home = () => {
    history.push('/');
    updateFilter({
      categoria: 0,
      label: '',
      page: 1,
      search: '',
      categoryName: 'Todas as categorias',
      redirect: true,
    });
    const baseUrl = [
      window.location.protocol,
      '//',
      window.location.host,
      '/',
      window.location.pathname.split('/')[1],
    ].join('');
    window.history.pushState(
      {},
      '',
      `${baseUrl}?categoria=${filter.categoria}&nome=Todas as categorias`,
    );
  };

  return (
    <>
      {store.found ? (
        <div>
          <Header
            categories={categories}
            codigo={store.codigo}
            goHome={() => home()}
            atualizacao={store.atualizacao}
            store={store}
          />
          <Content pathname={pathname} className="container mb-5">
            <Breadcrumb goHome={() => home()} />
            <MainContainer>
              <Router history={history}>
                <Switch>
                  <Route path="/" exact component={GridProducts} />
                  <Route path="/cart" exact component={Cart} />
                  <Route path="/register-data" exact component={RegisterData} />
                  <Route path="/address" exact component={Address} />
                  <Route path="/payment" exact component={Payment} />
                  <Route path="/conclusion" exact component={Conclusion} />
                  {/* <Route path="/checkout" exact component={Checkout} /> */}
                  <Route
                    path="/pedido-realizado"
                    exact
                    component={OrderPlaced}
                  />
                  <Route
                    path="/item/:id/:descricao?"
                    component={SingleProduct}
                  />
                </Switch>
              </Router>
            </MainContainer>
          </Content>
          <Footer storeInfo={store} />
        </div>
      ) : (
        notFoundHandle()
      )}
    </>
  );
};

export default App;
