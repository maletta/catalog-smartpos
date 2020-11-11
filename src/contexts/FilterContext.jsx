import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import queryString from 'query-string';

// import history from 'utils/history';
import paths from 'paths';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const router = useRouter();
  const parsed = queryString.parse(typeof window === 'object' ? window.location.search : {});

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
      router.push({
        pathname: paths.home,
        query: { categoria: newFilter.categoria, nome: newFilter.categoryName },
      },
      undefined,
      {
        shallow: true,
      });
      // const { origin, pathname } = window.location;
      // window.history.pushState({}, '',
      // `${origin}${pathname}?categoria=${newFilter.categoria}&nome=${newFilter.categoryName}`);
      console.log('passou pelo update - IF');
    }
    console.log('passou pelo update ');
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
