import axios from 'axios';

export const requestCEP = cep => axios.get(`https://viacep.com.br/ws/${cep}/json`);

export default {};
