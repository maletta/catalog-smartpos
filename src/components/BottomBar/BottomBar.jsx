import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ExibithionModeBottom from 'components/ExibithionModeBottom';
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

const BottomBar = (props) => {
  const {
    categoryFilter,
    onFilterCategory,
    order,
    onChangeOrder,
    viewMode,
    onChangeView,
    categories,
  } = props;

  return (
    <Nav>
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
          <ExibithionModeBottom
            viewMode={viewMode}
            onChangeView={onChangeView}
          />
        </Options>
      </Category>
    </Nav>
  );
};

BottomBar.propTypes = {
  viewMode: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
  order: PropTypes.string,
  onChangeOrder: PropTypes.func.isRequired,
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

BottomBar.defaultProps = {
  viewMode: 'GRID',
  order: 'AZ',
  categoryFilter: -1,
};


export default BottomBar;
