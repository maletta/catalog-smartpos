import 'babel-polyfill';
import 'url-search-params-polyfill';
import React, { useState, useEffect, useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import GridProducts from 'containers/GridProducts';
import MainContainer from 'containers/mainContainer';
import Cart from 'containers/Cart';
import Row from 'components/Row';
import Grid from 'components/Grid';
import NotFound from 'NotFound';
import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import history from 'utils/history';

import getStoreName from 'getStoreName';
import FiltersMobile from 'components/FiltersMobile';
import formatFormErrors from 'utils/formatFormErrors';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faArrowRight, faArrowLeft,
  faCaretDown, faSlidersH, faSort, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF, faWhatsapp, faInstagram, faGooglePlay,
} from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import {
  getStoreInfo,
  getCategories,
} from 'requests';

import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import initGA from './initGA';

library.add(faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope,
  faFacebookF, faTimes, faGooglePlay, faWhatsapp, faInstagram, faHeart,
  faArrowRight, faArrowLeft, faCaretDown, faSlidersH, faSort);

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Breadcrumb = styled.nav`
  &&& {
    background: transparent;
    margin-bottom: 0;
  }
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState({});
  const { filter, updateFilter } = useContext(FilterContext);
  const { updateShop } = useContext(ShopContext);

  const notFoundHandle = () => (loading ? (
    <Container>
      <Spinner />
    </Container>
  ) : !loading && (<NotFound />));

  const getCategoryList = (data) => {
    getCategories(data.id)
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => setCategories())
      .finally(() => setLoading(false));
  };

  const getStore = () => {
    getStoreInfo(getStoreName())
      .then((response) => {
        document.title = response.data.fantasia;
        setStore({ ...response.data, found: true, storeName: getStoreName() });
        updateShop(response.data);
        getCategoryList(response.data);
      })
      .catch(() => {
        setStore({ found: false });
        setLoading(false);
      });
  };

  useEffect(() => {
    yup.setLocale(formatFormErrors());
    window.scrollTo(0, 0);
    getStore();
    initGA();
  }, [filter]);


  const home = () => {
    history.push('/');
    updateFilter({
      categoria: 0, label: 'Todas as categorias', page: 1, search: '',
    });
    const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    window.history.pushState({}, '', `${baseUrl}`);
  };

  return (
    <>
      {store.found ? (
        <div>
          <Header codigo={store.codigo} goHome={() => home()} />
          <FiltersMobile
            categories={categories}
          />
          <div className="container mb-5">
            <Row>
              <Grid cols="12">
                <Breadcrumb className="breadcrumb">
                  <ul className="m-0">
                    <li><a onClick={e => home(e)} href="!#">{ store.storeName }</a></li>
                    <li className="is-active"><a href="!#" aria-current="page">{filter.search ? `resultados para: ${filter.search}` : filter.label}</a></li>
                  </ul>
                </Breadcrumb>
              </Grid>
            </Row>
            <MainContainer>
              <Router
                history={history}
              >
                <Switch>
                  <Route path="/" exact component={GridProducts} />
                  <Route path="/cart" exact component={Cart} />
                </Switch>
              </Router>
            </MainContainer>
          </div>
          <Footer storeInfo={store} />
        </div>
      ) : (notFoundHandle())}
    </>
  );
};

export default App;
