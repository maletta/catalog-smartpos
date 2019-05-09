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
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faSort,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { getStoreInfo, getProducts } from 'requests';

library.add(faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faFacebookF,
  faWhatsapp, faInstagram, faSort);

const App = () => {
  const [storeId] = useState(getStoreName());
  const [found, setFound] = useState();
  const [viewMode, setViewMode] = useState('GRID');
  const [categoryFilter, setCategoryFilter] = useState(-1);
  const [order, setOrder] = useState('AZ');
  const [store, setStore] = useState({});
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const getItems = (data) => {
    getProducts(data.id)
      .then(response => setProducts(response.data.produtos))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStoreInfo(storeId)
      .then((response) => {
        setStore(response.data);
        getItems(response.data);
        setFound(true);
      })
      .catch(() => setFound(false))
      .finally(() => setLoading(false));
  }, [storeId]);


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

  const grid = () => (viewMode === 'GRID' ? (<GridList itens={itensFiltered} />) : (<ListViewMode itens={itensFiltered} />));

  return (
    <>
      {found
        ? (
          <>
            <div className="container">
              <Header logo="https://lh3.googleusercontent.com/YPwFZ4FHxrKgvgvCgeZPCmfRSPsSwvBsB_9DvXtxcuaYax2cRemjR3mrZbqB4Qq41j4" />
              <MainContainer>
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
                {loading ? <Spinner /> : grid()}
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
            <Footer storeInfo={store} />
          </>
        ) : (notFoundHandle())}

    </>
  );
};

export default App;
