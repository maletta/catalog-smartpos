import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import history from 'utils/history';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const parsed = queryString.parse(window.location.search);

  const [filter, setFilter] = useState({
    label: parsed.item || 'Todas as categorias',
    page: parsed.page,
    categoria: parsed.categoria,
    orderBy: parsed.orderBy,
    sortBy: parsed.sortBy,
    search: parsed.search,
  });

  useEffect(() => {
    const stringified = queryString.stringify({ ...parsed, ...filter });
    const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    if (filter.categoria) { window.history.pushState({}, '', `${baseUrl}?${stringified}`); }
  }, [filter]);

  const updateFilter = (newFilter) => {
    history.push('/');
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
