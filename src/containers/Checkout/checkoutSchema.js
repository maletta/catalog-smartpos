import * as yup from 'yup';

import validateCpf from 'utils/validation/validateCpf';

const checkoutSchema = () => yup.object().shape({
  name: yup.string()
    .required()
    .max(150),
  email: yup.string()
    .required()
    .email(),
  cpf: yup.string()
    .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
  cep: yup.string()
    .required()
    .min(9, 'CEP inválido')
    .max(9, 'CEP inválido'),
  telefone: yup.string()
    .required()
    .max(20),
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

export default checkoutSchema;
