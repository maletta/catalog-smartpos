import * as yup from 'yup';

const paymentOfflineSchema = yup.object().shape({
  pagamento: yup.object().test('expiration', 'Selecione um tipo de pagamento', (inputValue) => {
    if (inputValue.tipoCartao) {
      return true;
    }
    return false;
  }),
});

export default paymentOfflineSchema;
