import axios from 'axios';

const getProduct = (tenant, idProduct) => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${tenant}/produtos/${idProduct}`);

export default getProduct;
