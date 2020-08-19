export const cleanCart = (updateShoppingCart) => {
  localStorage.removeItem('cartInit');
  updateShoppingCart({
    basketCount: 0,
    cep: '',
    cart: [],
    withdraw: false,
    deliveryFee: {
      cost: 0,
    },
    totalCart: 0,
    personData: {},
    address: {},
    paymentType: '',
    cardOverlay: false,
  });
};

export default {};
