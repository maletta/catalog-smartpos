/* eslint-disable no-template-curly-in-string */

const formatFormErrors = () => ({
  mixed: {
    required: 'Campo obrigatório',
    notType: ({ type }) => (type === 'number'
      ? 'Deve ser um número'
      : 'Campo inválido'),
  },
  string: {
    min: 'Deve ter pelo menos ${min} caracteres',
    max: 'Deve ter até ${max} caracteres',
    email: 'Email inválido',
  },
  number: {
    min: 'Deve ser pelo menos ${min}',
    max: 'Deve ser até ${max}',
    positive: 'Deve ser um valor positivo',
    integer: 'Deve ser um valor inteiro',
    moreThan: 'Campo deve ser maior que ${more}',
  },
});

export default formatFormErrors;
