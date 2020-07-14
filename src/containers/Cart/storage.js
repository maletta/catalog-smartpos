const updateLocalCart = (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
};

const getLocalCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

export default {
  updateLocalCart,
  getLocalCart,
};
