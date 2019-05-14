import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Header from 'containers/header';
import GridList from 'components/GridList';
import CategoryTopMobile from 'components/CategoryTopMobile';
import MainContainer from 'containers/mainContainer';
import SideBar from 'components/SideBar';
import NotFound from 'NotFound';
import Spinner from 'components/Spinner';
import Pagination from 'components/Pagination';
import Footer from 'containers/footer';
import getStoreName from 'getStoreName';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faSort,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import {
  getStoreInfo,
  getProducts,
  getCategories,
} from 'requests';

import FilterContext from 'contexts/FilterContext';

library.add(faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faFacebookF,
  faWhatsapp, faInstagram, faSort, faHeart);
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState({});
  const [maxPage, setMaxPage] = useState(1);

  const { filter } = useContext(FilterContext);

  const notFoundHandle = () => (loading ? (
    <Container>
      <Spinner />
    </Container>
  ) : !loading && (<NotFound />));

  const getProductList = (data) => {
    getProducts(data.id, filter)
      .then((response) => {
        setProducts(response.data.produtos);
        setMaxPage(response.data.totalPages);
      })
      .finally(() => setLoading(false));
  };

  const getCategoryList = (data) => {
    getCategories(data.id)
      .then(response => setCategories(response.data))
      .finally(() => setLoading(false));
  };

  const getStore = () => {
    getStoreInfo(getStoreName())
      .then((response) => {
        setStore({ ...response.data, found: true });
        getProductList(response.data);
        getCategoryList(response.data);
      })
      .catch(() => setStore({ found: false }))
      .finally(() => setLoading(false));
  };


  const prodArray = Object.keys(products).map(i => products[i]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getStore();
  }, [filter]);

  return (
    <>
      {store.found ? (
        <div>
          <div className="section">
            <div className="container">
              <Header storeInfo={store} />
              <MainContainer>
                <div className="column is-hidden-touch is-3-desktop">
                  <SideBar
                    categories={categories}
                    storeInfo={store}
                    loading={loading}
                  />
                </div>
                <div className="column is-12-tablet is-9-desktop">
                  <CategoryTopMobile
                    categories={categories}
                  />
                  {loading ? <Spinner /> : (<GridList itens={prodArray} loading={loading} />)}
                  <Pagination
                    currentPage={filter.page}
                    maxPage={maxPage}
                  />
                </div>
              </MainContainer>
            </div>
          </div>
          <Footer storeInfo={store} />
        </div>
      ) : (notFoundHandle())}

    </>
  );
};


export default App;
