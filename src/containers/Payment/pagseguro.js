
import { useState, useEffect } from 'react';

export const usePagSeguroHook = () => {
  const pagSeguroInitialState = {
    // setSessionId: () => {},
    // onSenderHashReady: () => {},
    // getPaymentMethods: () => {},
  };
  const [pagSeguro, setPagSeguro] = useState(null);


  useEffect(() => {
    function onWindowLoad() {
      setPagSeguro(() => (typeof window === 'object' ? window.window.PagSeguroDirectPayment : pagSeguroInitialState));
    }
    window.addEventListener('load', onWindowLoad);

    return () => {
      window.removeEventListener('load', onWindowLoad);
    };
  }, []);

  const getInstallments = (brand, amount, setInstallments) => {
    if (brand === 'none') return;

    pagSeguro.getInstallments({
      amount,
      brand,
      success({ installments }) {
        setInstallments(installments[brand]);
      },
    });
  };

  const getPaymentMethods = (amount, setCreditCardBrands) => {
    pagSeguro.getPaymentMethods({
      amount,
      success({ paymentMethods }) {
        const { CREDIT_CARD } = paymentMethods;
        const creditCardBrandList = Object.values(CREDIT_CARD.options);

        setCreditCardBrands(creditCardBrandList);
      },
    });
  };


  return {
    pagSeguro,
    getInstallments,
    getPaymentMethods,
  };
};

// export const pagseguro = typeof window === 'object' ?
// window.window.PagSeguroDirectPayment : null;

// export const getInstallments = (brand, amount, setInstallments) => {
//   if (brand === 'none') return;

//   if (typeof window === 'object') {
//     const { PagSeguroDirectPayment } = window.window;
//     PagSeguroDirectPayment.getInstallments({
//       amount,
//       brand,
//       success({ installments }) {
//         setInstallments(installments[brand]);
//       },
//     });
//   }
// };

// export const getPaymentMethods = (amount, setCreditCardBrands) => {
//   if (typeof window === 'object') {
//     const { PagSeguroDirectPayment } = window.window;
//     PagSeguroDirectPayment.getPaymentMethods({
//       amount,
//       success({ paymentMethods }) {
//         const { CREDIT_CARD } = paymentMethods;
//         const creditCardBrandList = Object.values(CREDIT_CARD.options);

//         setCreditCardBrands(creditCardBrandList);
//       },
//     });
//   }
// };

export default {};
