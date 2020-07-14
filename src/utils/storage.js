const updateLocalCart = (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
};

const removeLocalCart = () => {
  localStorage.removeItem('cart');
};

const getLocalCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

export default {
  updateLocalCart,
  getLocalCart,
  removeLocalCart,
};
