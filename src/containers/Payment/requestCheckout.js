import axios from "axios";

const createOrder = values => {
  const checkout = {
    ...values,
    cardNumber: null,
    cardNumber_unformatted: null,
    expiration: null,
    expiration_unformatted: null,
    cvv: null
  };
  return axios.post(
    `${process.env.REACT_APP_MAIN_API}/v1/loja/${values.catalog_id}/pedido`,
    checkout
  );
};

const getPayments = storeID =>
  axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${storeID}/pagamentos`);

const getSessionPag = storeID =>
  axios.get(
    `${process.env.REACT_APP_MAIN_API}/v1/pagseguro/session/${storeID}`
  );

const checkingDelivery = (locationCustomer, storeID) =>
  axios.get(
    `${process.env.REACT_APP_MAIN_API}/v1/loja/${storeID}/frete/${locationCustomer}`
  );

export { createOrder as default, getPayments, getSessionPag, checkingDelivery };
