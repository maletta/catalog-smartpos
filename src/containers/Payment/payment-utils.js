import storage from 'utils/storage';

export const cleanCart = (updateShoppingCart) => {
  localStorage.removeItem('cartInit');
  storage.removeLocalCart();
  updateShoppingCart({
    basketCount: 0,
    cep: '',
    cardOverlay: false,
  });
};

export default {};
