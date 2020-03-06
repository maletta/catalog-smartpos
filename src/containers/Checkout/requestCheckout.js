import axios from 'axios';

const createOrder = values => (axios.post(`${process.env.REACT_APP_MAIN_API}/v1/loja/${values.catalog_id}/pedido`, values));

const getPayments = storeID => (axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${storeID}/pagamentos`));

export {
  createOrder as default,
  getPayments,
};
