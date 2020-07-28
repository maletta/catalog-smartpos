import storage from 'utils/storage';

export const cleanCart = (updateShoppingCart) => {
  localStorage.removeItem('cartInit');
  storage.removeLocalCart();
  updateShoppingCart({
    cart: [],
    withdraw: false,
    cep: '',
    deliveryFee: {
      cost: 0,
    },
    basketCount: 0,
    totalCart: 0,
    personData: {},
    address: {},
    paymentType: '',
    cardOverlay: false,
  });
};

export default {};
