const updateLocalCart = (newCart) => {
  if (typeof window === 'object') {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
};

const removeLocalCart = () => {
  if (typeof window === 'object') {
    localStorage.removeItem('cart');
  }
};

const getLocalCart = () => {
  if (typeof window === 'object') {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  return [];
};

export default {
  updateLocalCart,
  getLocalCart,
  removeLocalCart,
};
