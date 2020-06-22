import * as yup from 'yup';

import validateCnpj from 'utils/validation/validateCnpj';
import validateCpf from 'utils/validation/validateCpf';

const sharedPersonSchema = {
  tipoPessoa: yup.object().required(),
  email: yup
    .string()
    .required()
    .email(),
  fone: yup
    .string()
    .required()
    .max(20),
};

const naturalPersonSchema = {
  ...sharedPersonSchema,
  name: yup
    .string()
    .required()
    .max(150),
  documento: yup
    .string()
    .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
};

const legalPerson = {
  ...sharedPersonSchema,
  fantasia: yup
    .string()
    .required()
    .max(150),
  razaoSocial: yup
    .string()
    .required()
    .max(150),
  documento: yup
    .string()
    .test('cnpj-valid', 'CNPJ inválido', value => validateCnpj(value)),
};

const checkoutSchema = isNaturalPerson => yup.object().shape({
  ...(isNaturalPerson ? naturalPersonSchema : legalPerson),
});

export default checkoutSchema;
