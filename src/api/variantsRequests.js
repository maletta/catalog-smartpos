import axios from 'axios';

const getVariantsOfProduct = (tenant, idProduct) => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${tenant}/produtos/${idProduct}/variante`);

export default getVariantsOfProduct;
