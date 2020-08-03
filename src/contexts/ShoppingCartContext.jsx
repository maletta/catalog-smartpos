import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import utilsCart from 'utils/cart';
import storage from 'utils/storage';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const previousCart = storage.getLocalCart();

  const [shoppingCart, setShoppingCart] = useState({
    cart: previousCart,
    withdraw: true,
    cep: '',
    deliveryFee: {
      cost: 0,
    },
    basketCount: utilsCart.sumCartQuantity(previousCart),
    totalCart: utilsCart.sumCartTotalPrice(previousCart),
    personData: {},
    address: {},
    paymentType: '',
    cardOverlay: false,
  });

  const updateShoppingCart = (newState) => {
    if (newState.cart) {
      storage.updateLocalCart(newState.cart);
    }

    setShoppingCart(previousState => ({ ...previousState, ...newState }));
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
