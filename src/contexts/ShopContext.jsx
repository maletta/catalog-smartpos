import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shop, setShop] = useState({
    is_enableOrder: 0,
    id: null,
  });

  const [category, setCategory] = useState([]);

  const updateShop = (newShop) => {
    setShop(prevState => ({ ...prevState, ...newShop }));
  };

  const updateCategoy = (newShop) => {
    setCategory(newShop);
  };

  return (
    <ShopContext.Provider value={{ shop, updateShop, category, updateCategoy }}>
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
