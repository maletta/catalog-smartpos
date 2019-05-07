import axios from 'axios';

const getStoreInfo = async id => axios.get(`${process.env.REACT_APP_MAIN_API}/loja/${id}`);

const getCategories = async id => axios.get(`${process.env.REACT_APP_MAIN_API}/categorias/${id}`);

export {
  getStoreInfo,
  getCategories,
};
