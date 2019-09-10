import 'babel-polyfill';
import 'url-search-params-polyfill';
import React, { useState, useEffect, useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import GridProducts from 'containers/GridProducts';
import MainContainer from 'containers/mainContainer';
import SideBar from 'components/SideBar';
import NotFound from 'NotFound';
import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';

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
import createHistory from 'utils/history';
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

const Section = styled.section`
  &&& {
    padding-top: 20px;

    @media (max-width: 768px) {
      padding-top: 12px;
    }
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


  const home = (e) => {
    if (e) { e.preventDefault(); }
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
          <Section className="section">
            <div className="container">
              <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li><a onClick={e => home(e)} href="!#">{ store.storeName }</a></li>
                  <li className="is-active"><a href="!#" aria-current="page">{filter.search ? `resultados para: ${filter.search}` : filter.label}</a></li>
                </ul>
              </nav>
              <MainContainer>
                <div className="column is-hidden-touch is-3-desktop">
                  <SideBar
                    categories={categories}
                    storeInfo={store}
                  />
                </div>
                <div className="column is-12-tablet is-9-desktop">
                  <Router
                    history={createHistory}
                  >
                    <Switch>
                      <Route path="/" exact component={GridProducts} />
                    </Switch>
                  </Router>
                </div>
              </MainContainer>
            </div>
          </Section>
          <Footer storeInfo={store} />
        </div>
      ) : (notFoundHandle())}
    </>
  );
};

export default App;
