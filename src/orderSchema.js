import * as yup from 'yup';

const orderValidation = variants => yup.object().shape({
  observacao: yup.string()
    .max(150),
  variant: yup.object()
    .test('valid_variant', 'Selecione uma variante do produto', (value) => {
      if (variants.length > 1) {
        return value.id;
      }
      return true;
    }),
});

export default orderValidation;
