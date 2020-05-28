import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import history from 'utils/history';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const parsed = queryString.parse(window.location.search);

  const [filter, setFilter] = useState({
    label: parsed.label || 'Todas as categorias',
    page: parsed.page,
    categoria: parsed.categoria || 0,
    orderBy: parsed.orderBy,
    sortBy: parsed.sortBy,
    search: parsed.search,
    redirect: false,
    categoryName: parsed.nome || '',
  });

  const updateFilter = (newFilter) => {
    if (newFilter.redirect) {
      history.push('/');
      const baseUrl2 = [window.location.protocol, '//', window.location.host, '/', window.location.pathname.split('/')[1]].join('');
      window.history.pushState({}, '', `${baseUrl2}?categoria=${newFilter.categoria}&nome=${newFilter.categoryName}`);
    }
    setFilter(state => ({ ...state, ...newFilter }));
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FilterContext;
