import { requestCEP } from 'api/cepRequests';

const transformDataToAddress = (cep, addressData) => {
  const {
    bairro,
    logradouro: endereco,
    localidade: cidade,
    ibge: codcidade,
    uf: estado,
  } = addressData;

  const tipoLogradouro = endereco.split(' ')[0];

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

export const getAddressByCEP = async (cep) => {
  const { data } = await requestCEP(cep);
  return transformDataToAddress(cep, data);
};

export default {};
