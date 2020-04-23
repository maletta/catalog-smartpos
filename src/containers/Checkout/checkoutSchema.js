/* eslint func-names: ["error", "never"] */
import * as yup from 'yup';
import moment from 'moment';

import validateCnpj from 'utils/validation/validateCnpj';
import validateCpf from 'utils/validation/validateCpf';

const checkoutSchema = (isNaturalPerson, offlinePayment) => {
  // Pagamento diretamente com o vendedor
  if (offlinePayment) {
    if (isNaturalPerson) {
      return yup.object().shape({
        tipoPessoa: yup.object()
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
        numero: yup.number()
          .required(),
        bairro: yup.string()
          .required()
          .max(100),
        cidade: yup.string()
          .required(),
        tipoEndereco: yup.object()
          .required(),
        estado: yup.string()
          .min(2)
          .max(50)
          .required(),
        pagamento: yup.object()
          .required(),
      });
    }

    return yup.object().shape({
      tipoPessoa: yup.object()
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
      numero: yup.number()
        .required(),
      bairro: yup.string()
        .required()
        .max(100),
      cidade: yup.string()
        .required(),
      tipoEndereco: yup.object()
        .required(),
      estado: yup.string()
        .min(2)
        .max(50)
        .required(),
      pagamento: yup.object()
        .required(),
    });
  }

  if (isNaturalPerson) {
    return yup.object().shape({
      tipoPessoa: yup.object()
        .required(),
      name: yup.string()
        .required()
        .max(150)
        .test('name', 'Nome completo', (value) => {
          if (value) {
            const firstName = value.split(' ').slice(0, 1).join(' ');
            const lastName = value.split(' ').slice(1).join(' ');
            if (firstName && lastName) {
              return true;
            }
          }

          return false;
        }),
      email: yup.string()
        .required()
        .email(),
      documento: yup.string()
        .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
      cep: yup.string()
        .required()
        .min(9, 'CEP inválido')
        .max(9, 'CEP inválido'),
      cobrancaCep: yup.string()
        .required()
        .min(9, 'CEP inválido')
        .max(9, 'CEP inválido'),
      fone: yup.string()
        .required()
        .max(20),
      tipoLogradouro: yup.string()
        .required()
        .max(50),
      cobrancaTipoLogradouro: yup.string()
        .required()
        .max(50),
      endereco: yup.string()
        .required()
        .max(150),
      cobrancaEndereco: yup.string()
        .required()
        .max(150),
      complemento: yup.string()
        .max(50),
      cobrancaComplemento: yup.string()
        .max(50),
      numero: yup.number()
        .required(),
      cobrancaNumero: yup.number()
        .required(),
      bairro: yup.string()
        .required()
        .max(100),
      cobrancaBairro: yup.string()
        .required()
        .max(100),
      cidade: yup.string()
        .required(),
      cobrancaCidade: yup.string()
        .required(),
      tipoEndereco: yup.object()
        .required(),
      estado: yup.string()
        .min(2)
        .max(50)
        .required(),
      cobrancaEstado: yup.string()
        .min(2)
        .max(50)
        .required(),
      nameHolder: yup.string()
        .required()
        .test('nameHolder', 'Nome completo', (value) => {
          if (value) {
            const firstName = value.split(' ').slice(0, 1).join(' ');
            const lastName = value.split(' ').slice(1).join(' ');
            if (firstName && lastName) {
              return true;
            }
          }

          return false;
        }),
      cpfHolder: yup.string()
        .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
      birthDateHolder: yup.string()
        .test('birthDateHolder', 'Campo inválido', inputValue => moment(inputValue, 'DD/MM/YYYY', true).isValid()),
      cardNumber_unformatted: yup.string()
        .required()
        .min(14, 'Inválido'),
      expiration: yup.string()
        .test('expiration', 'Campo inválido', inputValue => moment(inputValue, 'MM/YYYY', true).isValid()),
      cvv: yup.string()
        .required()
        .min(3)
        .max(4),
      installments: yup.object()
        .required(),
    });
  }

  return yup.object().shape({
    tipoPessoa: yup.object()
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
    cobrancaCep: yup.string()
      .required()
      .min(9, 'CEP inválido')
      .max(9, 'CEP inválido'),
    fone: yup.string()
      .required()
      .max(20),
    tipoLogradouro: yup.string()
      .required()
      .max(50),
    cobrancaTipoLogradouro: yup.string()
      .required()
      .max(50),
    endereco: yup.string()
      .required()
      .max(150),
    cobrancaEndereco: yup.string()
      .required()
      .max(150),
    complemento: yup.string()
      .max(50),
    cobrancaComplemento: yup.string()
      .max(50),
    numero: yup.number()
      .required(),
    cobrancaNumero: yup.number()
      .required(),
    bairro: yup.string()
      .required()
      .max(100),
    cobrancaBairro: yup.string()
      .required()
      .max(100),
    cidade: yup.string()
      .required(),
    cobrancaCidade: yup.string()
      .required(),
    tipoEndereco: yup.object()
      .required(),
    estado: yup.string()
      .min(2)
      .max(50)
      .required(),
    cobrancaEstado: yup.string()
      .min(2)
      .max(50)
      .required(),
    nameHolder: yup.string()
      .required()
      .test('nameHolder', 'Nome completo', (value) => {
        if (value) {
          const firstName = value.split(' ').slice(0, 1).join(' ');
          const lastName = value.split(' ').slice(1).join(' ');
          if (firstName && lastName) {
            return true;
          }
        }

        return false;
      }),
    cpfHolder: yup.string()
      .test('cpf-valid', 'CPF inválido', value => validateCpf(value)),
    birthDateHolder: yup.string()
      .test('birthDateHolder', 'Campo inválido', inputValue => moment(inputValue, 'DD/MM/YYYY', true).isValid()),
    cardNumber_unformatted: yup.string()
      .required()
      .min(14, 'Inválido'),
    expiration: yup.string()
      .test('expiration', 'Campo inválido', inputValue => moment(inputValue, 'MM/YYYY', true).isValid()),
    cvv: yup.string()
      .required()
      .min(3)
      .max(4),
    installments: yup.object()
      .required(),
  });
};

export default checkoutSchema;
