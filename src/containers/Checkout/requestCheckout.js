import axios from 'axios';

const createOrder = values => (axios.post(`${process.env.REACT_APP_MAIN_API}/v1/loja/${values.catalog_id}/pedido`, values));

export default createOrder;
