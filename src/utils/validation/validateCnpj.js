// https://www.geradorcnpj.com/javascript-validar-cnpj.htm
const validateCnpj = (cnpjRaw) => {
  if (typeof cnpjRaw === 'undefined') {
    return false;
  }

  const cnpj = cnpjRaw.replace(/[^\d]+/g, '');

  if (cnpj === '') {
    return false;
  }

  if (cnpj.length !== 14) {
    return false;
  }

  if (cnpj === '00000000000000'
    || cnpj === '11111111111111'
    || cnpj === '22222222222222'
    || cnpj === '33333333333333'
    || cnpj === '44444444444444'
    || cnpj === '55555555555555'
    || cnpj === '66666666666666'
    || cnpj === '77777777777777'
    || cnpj === '88888888888888'
    || cnpj === '99999999999999') {
    return false;
  }

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digitos = cnpj.substring(size);
  let soma = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i -= 1) {
    soma += numbers.charAt(size - i) * pos;
    pos -= 1;

    if (pos < 2) {
      pos = 9;
    }
  }

  // eslint-disable-next-line no-mixed-operators
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }

  size += 1;
  numbers = cnpj.substring(0, size);
  soma = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i -= 1) {
    soma += numbers.charAt(size - i) * pos;
    pos -= 1;
    if (pos < 2) { pos = 9; }
  }

  // eslint-disable-next-line no-mixed-operators
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado !== parseInt(digitos.charAt(1), 10)) {
    return false;
  }

  return true;
};

export default validateCnpj;
