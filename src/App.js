import React, { useState } from 'react';
import GridList from 'components/GridList';
import ListViewMode from 'components/ListViewMode';
import Header from 'containers/header';
import MainContainer from 'containers/mainContainer';
// a aqui o request da lista dos produtos
import itens from 'produtos';
import SideBar from 'components/SideBar';
import BottomBar from 'components/BottomBar';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faSort,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faFacebookF,
  faWhatsapp, faInstagram, faSort);


const App = () => {
  const [viewMode, setViewMode] = useState('GRID');
  const [categoryFilter, setCategoryFilter] = useState(-1);
  const [order, setOrder] = useState('AZ');

  const onChangeView = (view) => {
    setViewMode(view);
  };

  const onFilterCategory = (filter) => {
    setCategoryFilter(filter);
  };

  const onChangeOrder = (ordenation) => {
    setOrder(ordenation);
  };

  const filterItens = item => categoryFilter === -1 || item.category.id === categoryFilter;

  const itensFiltered = itens.filter(item => filterItens(item)).sort((a, b) => {
    if (order === 'AZ') {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    } if (order === 'ZA') {
      const x = b.name.toLowerCase();
      const y = a.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    } if (order === 'LESS') {
      return a.price - b.price;
    } if (order === 'GREATER') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <>
      <Header logo="https://lh3.googleusercontent.com/YPwFZ4FHxrKgvgvCgeZPCmfRSPsSwvBsB_9DvXtxcuaYax2cRemjR3mrZbqB4Qq41j4" />
      <MainContainer>
        <SideBar
          viewMode={viewMode}
          onChangeView={view => onChangeView(view)}
          order={order}
          onChangeOrder={orderField => onChangeOrder(orderField)}
          categoryFilter={categoryFilter}
          onFilterCategory={category => onFilterCategory(category)}
        />
        {viewMode === 'GRID' ? (<GridList itens={itensFiltered} />) : (<ListViewMode itens={itensFiltered} />)}
      </MainContainer>
      <BottomBar
        viewMode={viewMode}
        onChangeView={view => onChangeView(view)}
        order={order}
        onChangeOrder={orderField => onChangeOrder(orderField)}
        categoryFilter={categoryFilter}
        onFilterCategory={category => onFilterCategory(category)}
      />
    </>
  );
};

export default App;
