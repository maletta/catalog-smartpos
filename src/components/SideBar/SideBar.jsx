import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryFilterList from 'components/CategoryFilterList';
import OrderOption from 'components/OrderOption';

const Aside = styled.aside`
  margin-top: 0.75rem;
`;

const SideBar = (props) => {
  const {
    categoryFilter,
    onFilterCategory,
    order,
    onChangeOrder,
    categories,
  } = props;

  return (
    <Aside>
      <CategoryFilterList
        categoryFilter={categoryFilter}
        onFilterCategory={onFilterCategory}
        categoriesList={categories}
      />
      <OrderOption
        order={order}
        onChangeOrder={onChangeOrder}
      />
    </Aside>
  );
};

SideBar.propTypes = {
  order: PropTypes.string,
  onChangeOrder: PropTypes.func.isRequired,
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

SideBar.defaultProps = {
  order: 'AZ',
  categoryFilter: -1,
};

export default SideBar;
