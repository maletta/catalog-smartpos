import * as yup from 'yup';

import validateCnpj from 'utils/validation/validateCnpj';
import validateCpf from 'utils/validation/validateCpf';

const sharedPersonSchema = {
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email(),
  foneFormatted: yup
    .string()
    .required('Telefone é obrigatório')
    .max(20),
};

const naturalPersonSchema = {
  ...sharedPersonSchema,
  name: yup
    .string()
    .required('Nome é obrigatório')
    .test('name', 'Digite o nome completo', (value) => {
      if (!value) return false;

      const [firstName, ...lastName] = value.split(' ');
      return firstName && lastName.join('');
    }),
  documento: yup
    .string()
    .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
};

const legalPerson = {
  ...sharedPersonSchema,
  fantasia: yup
    .string()
    .required('Nome fantasia é obrigatório')
    .max(150),
  razaoSocial: yup
    .string()
    .required('Razão social é obrigatório')
    .max(150),
  documento: yup
    .string()
    .test('cnpj-valid', 'CNPJ inválido', value => validateCnpj(value)),
};

const checkoutSchema = isNaturalPerson => yup.object().shape({
  ...(isNaturalPerson ? naturalPersonSchema : legalPerson),
});

export default checkoutSchema;
