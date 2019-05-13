import React, { useState, useEffect } from 'react';
import GridList from 'components/GridList';
import ListViewMode from 'components/ListViewMode';
import Header from 'containers/header';
import MainContainer from 'containers/mainContainer';
import Footer from 'containers/footer';
import SideBar from 'components/SideBar';
import BottomBar from 'components/BottomBar';
import Spinner from 'components/Spinner';
import getStoreName from 'getStoreName';
import NotFound from 'NotFound';
import Pagination from 'components/Pagination';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faSort,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { getStoreInfo, getProducts } from 'requests';

library.add(faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faFacebookF,
  faWhatsapp, faInstagram, faSort, faHeart);

const App = () => {
  const [storeId] = useState(getStoreName());
  const [found, setFound] = useState();
  const [store, setStore] = useState({});
  const [products, setProducts] = useState({});
  const [params, setParams] = useState({ page: 1 });

  const [maxPage, setMaxPage] = useState(1);
  const [viewMode, setViewMode] = useState('GRID');
  const [categoryFilter, setCategoryFilter] = useState(-1);
  const [order, setOrder] = useState('AZ');
  const [loading, setLoading] = useState(true);

  const getItems = (data) => {
    getProducts(data.id, params.page)
      .then((response) => {
        setProducts(response.data.produtos);
        setMaxPage(response.data.totalPages);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getStoreInfo(storeId)
      .then((response) => {
        setStore(response.data);
        getItems(response.data);
        setFound(true);
      })
      .catch(() => setFound(false))
      .finally(() => setLoading(false));
  }, [params]);

  const onChangeView = view => setViewMode(view);

  const onFilterCategory = filter => setCategoryFilter(filter);

  const onChangeOrder = ordenation => setOrder(ordenation);

  const filterItens = item => categoryFilter === -1 || item.categoria_id === categoryFilter;

  const notFoundHandle = () => (loading ? (<Spinner />) : !loading && (<NotFound />));

  const prodArray = Object.keys(products).map(i => products[i]);

  const itensFiltered = prodArray.filter(item => filterItens(item)).sort((a, b) => {
    if (order === 'AZ') {
      const x = a.descricao.toLowerCase();
      const y = b.descricao.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    } if (order === 'ZA') {
      const x = b.descricao.toLowerCase();
      const y = a.descricao.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    } if (order === 'LESS') {
      return a.valorVenda - b.valorVenda;
    } if (order === 'GREATER') {
      return b.valorVenda - a.valorVenda;
    }
    return 0;
  });

  const grid = () => (viewMode === 'GRID' ? (<GridList itens={itensFiltered} loading={loading} />) : (<ListViewMode itens={itensFiltered} />));

  return (
    <>
      {found
        ? (
          <>
            <div className="section">
              <div className="container">
                <Header logo="https://lh3.googleusercontent.com/YPwFZ4FHxrKgvgvCgeZPCmfRSPsSwvBsB_9DvXtxcuaYax2cRemjR3mrZbqB4Qq41j4" />
                <MainContainer>
                  <div className="column is-hidden-touch is-3-desktop">
                    <SideBar
                      viewMode={viewMode}
                      onChangeView={view => onChangeView(view)}
                      order={order}
                      onChangeOrder={orderField => onChangeOrder(orderField)}
                      categoryFilter={categoryFilter}
                      onFilterCategory={category => onFilterCategory(category)}
                      storeInfo={store}
                      loading={loading}
                    />
                  </div>
                  <div className="column is-12-tablet is-9-desktop">
                    {loading ? <Spinner /> : grid()}
                    <Pagination
                      setPage={setParams}
                      currentPage={params.page}
                      maxPage={maxPage}
                    />
                  </div>
                </MainContainer>
                <BottomBar
                  viewMode={viewMode}
                  onChangeView={view => onChangeView(view)}
                  order={order}
                  onChangeOrder={orderField => onChangeOrder(orderField)}
                  categoryFilter={categoryFilter}
                  onFilterCategory={category => onFilterCategory(category)}
                />
              </div>
            </div>
            <Footer storeInfo={store} />
          </>
        ) : (notFoundHandle())}
    </>
  );
};

export default App;
