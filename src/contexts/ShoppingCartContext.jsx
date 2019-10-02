import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const prevCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  const basketCount = prevCart.reduce((count, val) => (count + val.quantity), 0);

  const [shoppingCart, setShoppingCart] = useState({
    basketCount,
  });

  const updateShoppingCart = (newShop) => {
    setShoppingCart(prevState => ({ ...prevState, ...newShop }));
  };

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, updateShoppingCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ShoppingCartContext;
