export const cleanCart = (updateShoppingCart) => {
  localStorage.removeItem('cartInit');
  updateShoppingCart({
    basketCount: 0,
    cep: '',
    cardOverlay: false,
  });
};

export default {};
