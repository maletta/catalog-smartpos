import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shop, setShop] = useState({
    is_enableOrder: 0,
    id: null,
  });

  const [categories, setCategory] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState({
    orderProducts: [],
    costDelivery: {
      cost: 0,
    },
  });

  const updateShop = (newShop) => {
    setShop(prevState => ({ ...prevState, ...newShop }));
  };

  const updateCategory = (newShop) => {
    setCategory(newShop);
  };

  const updateOrderPlaced = (newOrder) => {
    setOrderPlaced(newOrder);
  };

  const provider = {
    shop, updateShop, categories, updateCategory, orderPlaced, updateOrderPlaced,
  };

  return (
    <ShopContext.Provider value={provider}>
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
