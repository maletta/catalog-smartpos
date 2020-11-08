import axios from 'axios';

const getVariantsOfProduct = (tenant, idProduct) => axios.get(`${process.env.NEXT_PUBLIC_MAIN_API}/v1/loja/${tenant}/produtos/${idProduct}/variante`);

export default getVariantsOfProduct;
