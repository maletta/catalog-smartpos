import * as yup from 'yup';

const paymentOfflineSchema = yup.object().shape({
  pagamento: yup.object().test('expiration', 'Selecione um tipo de pagamento', (inputValue) => {
    if (inputValue.tipoCartao || inputValue.tipoCartao === null) {
      return true;
    }
    return false;
  }),
});

export default paymentOfflineSchema;
