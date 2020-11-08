import axios from 'axios';

const getModifiersOfProduct = (tenant, idProduct) => axios.get(`${process.env.NEXT_PUBLIC_MAIN_API}/v1/loja/${tenant}/produtos/${idProduct}/modificadores`);

export default getModifiersOfProduct;
