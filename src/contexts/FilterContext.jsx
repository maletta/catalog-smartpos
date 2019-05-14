import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const parsed = queryString.parse(window.location.search);
  const [filter, setFilter] = useState({
    page: 1,
    categoria: 0,
    orderBy: 'desc',
    sortBy: 'valorVenda',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const stringified = queryString.stringify({ ...parsed, ...filter });
    const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    window.history.pushState({}, '', `${baseUrl}?${stringified}`);
  }, [filter]);

  const updateFilter = (newFilter) => {
    setFilter(state => ({ ...state, ...newFilter }));
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

FilterContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FilterContext;
