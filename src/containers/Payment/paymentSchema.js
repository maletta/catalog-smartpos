import * as yup from 'yup';
import moment from 'moment';

import validateCpf from 'utils/validation/validateCpf';

const paymentSchema = yup.object().shape({
  nameHolder: yup
    .string()
    .required('Nome é obrigatório')
    .test('nameHolder', 'Nome do titular', (value) => {
      if (!value) return false;

      const [firstName, ...lastName] = value.split(' ');
      return firstName && lastName.join('');
    }),
  cpfHolder: yup
    .string()
    .required('CPF é obrigatório')
    .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
  birthDateHolder: yup
    .string()
    .required('Data de nascimento é obrigatória')
    .test('birthDateHolder', 'Campo inválido', inputValue => moment(inputValue, 'DD/MM/YYYY', true).isValid()),
  cardNumber_unformatted: yup
    .string()
    .required('Número do cartão é obrigatório')
    .min(14, 'Inválido'),
  expiration: yup
    .string()
    .required('Validade é obrigatória')
    .test('expiration', 'Campo inválido', inputValue => moment(inputValue, 'MM/YYYY', true).isValid()),
  cvv: yup
    .string()
    .required('Código de segurança é obrigatório')
    .min(3)
    .max(4),
  installments: yup.object().required('As parcelas são obrigatórias'),
});

export default paymentSchema;
