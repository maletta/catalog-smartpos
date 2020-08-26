import React, { useContext } from 'react';

import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import SideBarContainer from './SideBarContainer';

const SideBar = () => {
  const { filter, updateFilter } = useContext(FilterContext);
  const { categories } = useContext(ShopContext);
  return (
    <SideBarContainer categories={categories} filter={filter} updateFilter={updateFilter} />
  );
};

export default SideBar;
