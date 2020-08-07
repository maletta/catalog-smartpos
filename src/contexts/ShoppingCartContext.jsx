import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import ShopContext from 'contexts/ShopContext';
import utilsCart from 'utils/cart';
import storage from 'utils/storage';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const { shop } = useContext(ShopContext);
  const previousCart = storage.getLocalCart();

  const [shoppingCart, setShoppingCart] = useState({
    cart: previousCart,
    basketCount: utilsCart.sumCartQuantity(previousCart),
    totalCart: utilsCart.sumCartTotalPrice(previousCart),
    hasItems: previousCart.length > 0,
    withdraw: shop.deliveryMode !== 'DELIVERY',
    cep: '',
    deliveryFee: { cost: 0, isDeliverable: false },
    personData: {},
    address: {},
    paymentType: '',
    cardOverlay: false,
  });

  const updateShoppingCart = (newState) => {
    const newCart = newState.cart;

    if (newCart) {
      storage.updateLocalCart(newCart);

      const basketState = {
        basketCount: utilsCart.sumCartQuantity(newCart),
        totalCart: utilsCart.sumCartTotalPrice(newCart),
        hasItems: newCart.length > 0,
      };

      setShoppingCart(previousState => ({
        ...previousState,
        ...basketState,
      }));
    }

    if (newState.withdraw) {
      setShoppingCart(previousState => ({
        ...previousState, ...newState, deliveryFee: { cost: 0, isDeliverable: false },
      }));
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
