const currencyOptions = {
  style: 'currency',
  currency: 'BRL',
};

const format = options => (number = 0) => number.toLocaleString('pt-BR', options);

const formatCurrency = format(currencyOptions);

export default formatCurrency;
