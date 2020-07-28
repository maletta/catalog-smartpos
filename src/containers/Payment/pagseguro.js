const { PagSeguroDirectPayment } = window.window;

export const pagseguro = PagSeguroDirectPayment;

export const getInstallments = (brand, amount, setInstallments) => {
  if (brand === 'none') return;

  pagseguro.getInstallments({
    amount,
    brand,
    success({ installments }) {
      setInstallments(installments[brand]);
    },
  });
};

export const getPaymentMethods = (amount, setCreditCardBrands) => {
  pagseguro.getPaymentMethods({
    amount,
    success({ paymentMethods }) {
      const { CREDIT_CARD } = paymentMethods;
      const creditCardBrandList = Object.values(CREDIT_CARD.options);

      setCreditCardBrands(creditCardBrandList);
    },
  });
};

export default {};
