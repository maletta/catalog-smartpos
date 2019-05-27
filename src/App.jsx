import React, { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import GridList from 'components/GridList';
import MainContainer from 'containers/mainContainer';
import SideBar from 'components/SideBar';
import NotFound from 'NotFound';
import Spinner from 'components/Spinner';
import Footer from 'components/Footer';
import Header from 'containers/Header';

import getStoreName from 'getStoreName';
import FiltersMobile from 'components/FiltersMobile';
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
  getProducts,
  getCategories,
} from 'requests';

import FilterContext from 'contexts/FilterContext';
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

const App = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState({});
  const [maxPage, setMaxPage] = useState(1);

  const { filter, updateFilter } = useContext(FilterContext);

  const notFoundHandle = () => (loading ? (
    <Container>
      <Spinner />
    </Container>
  ) : !loading && (<NotFound />));

  const handlePagination = (data) => {
    updateFilter({ page: data.selected + 1 });
  };

  const getProductList = (data) => {
    getProducts(data.id, filter)
      .then((response) => {
        setProducts(response.data.produtos);
        setMaxPage(response.data.totalPages);
      })
      .catch(() => {
        setProducts({});
        setMaxPage(-1);
      })
      .finally(() => setLoading(false));
  };

  const getCategoryList = (data) => {
    getCategories(data.id)
      .then(response => setCategories(response.data))
      .catch(() => setCategories())
      .finally(() => setLoading(false));
  };

  const getStore = () => {
    getStoreInfo(getStoreName())
      .then((response) => {
        document.title = response.data.fantasia;
        setStore({ ...response.data, found: true, store: getStoreName() });
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
    initGA();
  }, [filter]);

  return (
    <>
      {store.found ? (
        <div>
          <Header codigo={store.codigo} />
          <FiltersMobile
            categories={categories}
          />
          <div className="section">
            <div className="container">
              <MainContainer>
                <div className="column is-hidden-touch is-3-desktop">
                  <SideBar
                    categories={categories}
                    storeInfo={store}
                    loading={loading}
                  />
                </div>
                <div className="column is-12-tablet is-9-desktop">
                  {loading ? <Spinner /> : (<GridList itens={prodArray} loading={loading} />)}
                  <ReactPaginate
                    previousLabel="Anterior"
                    nextLabel="Próxima"
                    breakLabel="..."
                    breakClassName="break-me"
                    pageCount={maxPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePagination}
                    containerClassName="pagination"
                    subContainerClassName="pages pagination"
                    activeClassName="active"
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
