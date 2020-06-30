import * as yup from 'yup';
import moment from 'moment';

import validateCpf from 'utils/validation/validateCpf';

const paymentSchema = yup.object().shape({
  nameHolder: yup
    .string()
    .required()
    .test('nameHolder', 'Nome do titular', (value) => {
      if (!value) return false;

      const [firstName, ...lastName] = value.split(' ');
      return firstName && lastName;
    }),
  cpfHolder: yup
    .string()
    .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
  birthDateHolder: yup
    .string()
    .test('birthDateHolder', 'Campo inválido', inputValue => moment(inputValue, 'DD/MM/YYYY', true).isValid()),
  cardNumber_unformatted: yup
    .string()
    .required()
    .min(14, 'Inválido'),
  expiration: yup
    .string()
    .test('expiration', 'Campo inválido', inputValue => moment(inputValue, 'MM/YYYY', true).isValid()),
  cvv: yup
    .string()
    .required()
    .min(3)
    .max(4),
  installments: yup.object().required(),
});

export default paymentSchema;
