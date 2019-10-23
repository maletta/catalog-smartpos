import axios from 'axios';

const getCep = cep => (axios.get(`https://viacep.com.br/ws/${cep}/json/`));

export default getCep;
