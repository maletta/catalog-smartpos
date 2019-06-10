import axios from 'axios';

const getSearch = (id, filter) => {
  let param;
  if (!filter) {
    param = {
      page: 1,
      orderBy: 'desc',
      sortBy: 'valorVenda',
    };
  } else {
    param = { ...filter };
  }
  return axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${id}/produtos/busca?q=${filter.search}`, {
    params: {
      ...param,
    },
  });
};

const getStoreInfo = id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${id}`);

const getCategories = id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/categorias/${id}`);

const getProducts = (store, filter) => {
  let param;
  if (!filter) {
    param = {
      page: 1,
      categoria: 0,
      orderBy: 'desc',
      sortBy: 'valorVenda',
      stock: store.stock,
    };
  } else {
    param = { ...filter, stock: store.stock };
  }
  return axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/produtos/${store.id}`, {
    params: {
      ...param,
    },
  });
};

export {
  getStoreInfo,
  getCategories,
  getProducts,
  getSearch,
};
