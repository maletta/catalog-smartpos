import axios from 'axios';

const getStoreInfo = async id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${id}`);

const getCategories = async id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/categorias/${id}`);

const getProducts = async id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/produtos/${id}?page=1&sortBy=valorVenda&orderBy=asc`);

export {
  getStoreInfo,
  getCategories,
  getProducts,
};
