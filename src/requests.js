import axios from 'axios';

const getStoreInfo = id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${id}`);

const getCategories = id => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/categorias/${id}`);

const getProducts = (id, filter) => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/produtos/${id}`, {
  params: {
    ...filter,
    limit: 9,
  },
});

export {
  getStoreInfo,
  getCategories,
  getProducts,
};
