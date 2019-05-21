import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const FilterContext = createContext();
const abortController = new AbortController();

export const FilterProvider = ({ children }) => {
  const parsed = queryString.parse(window.location.search);

  const [filter, setFilter] = useState({
    page: parsed.page || (1),
    categoria: parsed.categoria || (0),
    orderBy: parsed.orderBy || ('desc'),
    sortBy: parsed.sortBy || ('valorVenda'),
  });

  useEffect(() => {
    const stringified = queryString.stringify({ ...parsed, ...filter });
    const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    window.history.pushState({}, '', `${baseUrl}?${stringified}`);
    abortController.abort();
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

FilterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FilterContext;
