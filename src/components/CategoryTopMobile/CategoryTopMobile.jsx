import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OrderFilterBottom from 'components/OrderFilterBottom';
import CategoryFilterListBottom from 'components/CategoryFilterListBottom';


const Nav = styled.nav`
  display: flex;
  align-items: flex-end;
`;

const Category = styled.div`
  width: 100%;
  position: relative;
`;

const Options = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const CategoryTopMobile = (props) => {
  const {
    categoryFilter,
    onFilterCategory,
    order,
    onChangeOrder,
    categories,
  } = props;

  return (
    <Nav className="is-hidden-desktop">
      <Category>
        <CategoryFilterListBottom
          categoryFilter={categoryFilter}
          onFilterCategory={onFilterCategory}
          categories={categories}
        />
        <Options>
          <OrderFilterBottom
            order={order}
            onChangeOrder={onChangeOrder}
          />
        </Options>
      </Category>
    </Nav>
  );
};

CategoryTopMobile.propTypes = {
  order: PropTypes.string,
  onChangeOrder: PropTypes.func.isRequired,
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

CategoryTopMobile.defaultProps = {
  order: 'AZ',
  categoryFilter: -1,
};


export default CategoryTopMobile;
