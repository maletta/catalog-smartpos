import * as yup from 'yup';

import validateCnpj from 'utils/validation/validateCnpj';
import validateCpf from 'utils/validation/validateCpf';

const checkoutSchema = (isNaturalPerson) => {
  if (isNaturalPerson) {
    return yup.object().shape({
      tipoPessoa: yup.string()
        .required(),
      name: yup.string()
        .required()
        .max(150),
      email: yup.string()
        .required()
        .email(),
      documento: yup.string()
        .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
      cep: yup.string()
        .required()
        .min(9, 'CEP inválido')
        .max(9, 'CEP inválido'),
      fone: yup.string()
        .required()
        .max(20),
      tipoLogradouro: yup.string()
        .required()
        .max(50),
      endereco: yup.string()
        .required()
        .max(150),
      complemento: yup.string()
        .max(50),
      numero: yup.string()
        .required()
        .max(50),
      bairro: yup.string()
        .required()
        .max(100),
      cidade: yup.string()
        .required(),
      estado: yup.string()
        .min(2)
        .max(50)
        .required(),
      formaPagamento: yup.string()
        .required(),
    });
  }

  return yup.object().shape({
    tipoPessoa: yup.string()
      .required(),
    fantasia: yup.string()
      .required()
      .max(150),
    razaoSocial: yup.string()
      .required()
      .max(150),
    email: yup.string()
      .required()
      .email(),
    documento: yup.string()
      .test('cnpj-valid', 'CNPJ inválido', value => validateCnpj(value)),
    cep: yup.string()
      .required()
      .min(9, 'CEP inválido')
      .max(9, 'CEP inválido'),
    fone: yup.string()
      .required()
      .max(20),
    tipoLogradouro: yup.string()
      .required()
      .max(50),
    endereco: yup.string()
      .required()
      .max(150),
    complemento: yup.string()
      .max(50),
    numero: yup.string()
      .required()
      .max(50),
    bairro: yup.string()
      .required()
      .max(100),
    cidade: yup.string()
      .required(),
    estado: yup.string()
      .min(2)
      .max(50)
      .required(),
    formaPagamento: yup.string()
      .required(),
  });
};

export default checkoutSchema;
