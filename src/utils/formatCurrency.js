const currencyOptions = {
  style: 'currency',
  currency: 'BRL',
};

const format = options => (number = 0) => (number ? number.toLocaleString('pt-BR', options) : 0);

const formatCurrency = format(currencyOptions);

export default formatCurrency;
