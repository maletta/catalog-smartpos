import * as yup from 'yup';

const addressSchema = () => yup.object().shape({
  cep: yup
    .string()
    .required()
    .min(9, 'CEP inválido')
    .max(9, 'CEP inválido'),
  endereco: yup
    .string()
    .required('Endereço é obrigatório')
    .max(150),
  complemento: yup.string().max(50, 'Máximo de 50 caracteres'),
  numero: yup.number().required('Número é obrigatório'),
  bairro: yup
    .string()
    .required('Bairro é obrigatório')
    .max(100),
  cidade: yup.string().required('Cidade é obrigatório'),
  estado: yup
    .string()
    .min(2)
    .max(50)
    .required('Estado é obrigatório'),
});

export default addressSchema;
