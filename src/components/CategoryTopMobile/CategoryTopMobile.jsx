import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryFilterListBottom from 'components/CategoryFilterListBottom';

const Nav = styled.nav`
  display: flex;
  align-items: flex-end;
`;

const Category = styled.div`
  width: 100%;
  position: relative;
`;

const CategoryTopMobile = (props) => {
  const {
    categoryFilter,
    categories,
  } = props;

  return (
    <Nav className="is-hidden-desktop">
      <Category>
        <CategoryFilterListBottom
          categoryFilter={categoryFilter}
          categories={categories}
        />
      </Category>
    </Nav>
  );
};

CategoryTopMobile.propTypes = {
  categoryFilter: PropTypes.number,
  categories: PropTypes.array.isRequired,
};

CategoryTopMobile.defaultProps = {
  categoryFilter: -1,
};


export default CategoryTopMobile;
