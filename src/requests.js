import axios from 'axios';

const storePath = `${process.env.REACT_APP_MAIN_API}/v1/loja`;
const createParamsFilter = filter => ({
  params: {
    ...filter,
  },
});

const defaultFilter = {
  page: 1,
  orderBy: 'desc',
  sortBy: 'valorVenda',
};

const getSearch = (id, filter = defaultFilter) => axios.get(
  `${storePath}/${id}/produtos/busca?q=${filter.search}`,
  createParamsFilter(filter),
);

const getStoreInfo = name => axios.get(`${storePath}/${name}`);
const getCategories = id => axios.get(`${storePath}/categorias/${id}`);

const getProducts = (store, filter = defaultFilter) => {
  const param = { ...filter, stock: store.stock };
  return axios.get(`${storePath}/produtos/${store.id}`, createParamsFilter(param));
};

export {
  getStoreInfo,
  getCategories,
  getProducts,
  getSearch,
};
