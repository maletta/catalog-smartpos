import axios from 'axios';

const getBusinessHour = (tenant, codigo, timezone) => axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${tenant}/${codigo}/${timezone}/timezone`);

export default getBusinessHour;
