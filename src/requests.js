import axios from 'axios';

const getStoreInfo = id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${id}`);

const getCategories = id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/categorias/${id}`);

const getProducts = (id, page) => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/produtos/${id}?page=${page}`);

export {
  getStoreInfo,
  getCategories,
  getProducts,
};
