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
      limit: 9,
    },
  });
};

const getStoreInfo = id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${id}`);

const getCategories = id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/categorias/${id}`);

const getProducts = (id, filter) => {
  let param;
  if (!filter) {
    param = {
      page: 1,
      categoria: 0,
      orderBy: 'desc',
      sortBy: 'valorVenda',
    };
  } else {
    param = { ...filter };
  }
  return axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/produtos/${id}`, {
    params: {
      ...param,
      limit: 9,
    },
  });
};

export {
  getStoreInfo,
  getCategories,
  getProducts,
  getSearch,
};
