import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const prevCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  const basketCount = prevCart.reduce((count, val) => (count + val.amount), 0);
  const [shop, setShop] = useState({
    id: '0',
    basketCount,
  });

  const updateShop = (newShop) => {
    setShop(prevState => ({ ...prevState, ...newShop }));
  };

  return (
    <ShopContext.Provider value={{ shop, updateShop }}>
      {children}
    </ShopContext.Provider>
  );
};

ShopProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ShopContext;
