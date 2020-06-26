import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const prevCart = JSON.parse(localStorage.getItem('cart') || '[]');
  console.log({ prevCart });

  const basketCount = prevCart.reduce((count, val) => count + val.quantity, 0);
  console.log({ basketCount });

  const totalCart = prevCart.reduce(
    (count, val) => count + val.quantity * (val.pricing.modifiers + val.pricing.product),
    0,
  );
  console.log({ totalCart });

  const [shoppingCart, setShoppingCart] = useState({
    cart: prevCart,
    withdraw: false,
    cep: '',
    deliveryFee: null,
    basketCount,
    totalCart,
    personData: {},
    address: {},
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
