import storage from 'utils/storage';

export const cleanCart = () => {
  localStorage.removeItem('cartInit');
  storage.removeLocalCart();
};

export default {};
