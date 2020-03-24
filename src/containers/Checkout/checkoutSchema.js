import * as yup from 'yup';

import validateCnpj from 'utils/validation/validateCnpj';
import validateCpf from 'utils/validation/validateCpf';

const checkoutSchema = (isNaturalPerson) => {
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
      numero: yup.string()
        .required()
        .max(50),
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
    numero: yup.string()
      .required()
      .max(50),
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
      .test('perIPI-rule', 'Campo inválido', function (inputValue) {
        const gatwayPagseguro = this.resolve(yup.ref('gatwayPagseguro'));
        if (!gatwayPagseguro && !inputValue) {
          return false;
        }
        return true;
      }),
  });
};

export default checkoutSchema;
