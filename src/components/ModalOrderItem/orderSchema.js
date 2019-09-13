import * as yup from 'yup';

const orderValidation = variants => yup.object().shape({
  note: yup.string()
    .max(150),
  variant: yup.object()
    .test('valid_variant', 'Selecione uma variante do produto', (value) => {
      if (variants.length > 0) {
        return value.id;
      }
      return true;
    }),
  amount: yup.number()
    .positive(),
});

export default orderValidation;
