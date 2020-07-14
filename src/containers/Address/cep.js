import axios from 'axios';

const requestCEP = cep => axios.get(`https://viacep.com.br/ws/${cep}/json`);

const transformDataToAddress = (cep, addressData) => {
  const {
    bairro,
    logradouro: endereco,
    localidade: cidade,
    ibge: codcidade,
    uf: estado,
  } = addressData;
  const [tipoLogradouro] = endereco.split(' ');

  return ({
    cep,
    endereco,
    tipoLogradouro,
    bairro,
    cidade,
    codcidade,
    estado,
  });
};

const getAddressByCEP = async (cep) => {
  const { data } = await requestCEP(cep);
  return transformDataToAddress(cep, data);
};

export default {
  getAddressByCEP,
  requestCEP,
};
