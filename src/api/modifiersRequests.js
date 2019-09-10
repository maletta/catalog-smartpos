import axios from 'axios';

const getModifiersOfProduct = (tenant, idProduct) => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${tenant}/produtos/${idProduct}/modificadores`);

export default getModifiersOfProduct;
