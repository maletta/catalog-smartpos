import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LinkItem } from 'components/List';
// Aqui o request para as categorias
import categories from 'categorias';

const Button = styled.button`
  border: none;
  background: none;
  width: 100%;
  height: 48px;
  font-size: 1rem;
`;

const List = styled.ul`
  border-bottom: 1px whitesmoke solid;
  padding: 10px 0;
`;

const CategoryFilterListBottom = (props) => {
  const { onFilterCategory, categoryFilter } = props;
  const [isOpen, setIsOpen] = useState(false);

  const openCategories = () => {
    setIsOpen(!isOpen && true);
  };

  const selectCategory = (item) => {
    onFilterCategory(item);
    setIsOpen(false);
  };

  const isSelected = (item) => {
    if (!item && !categoryFilter) {
      return true;
    }
    if ((item && !categoryFilter) || (!item && categoryFilter)) {
      return false;
    }
    return (item === categoryFilter);
  };

  const items = categories.map(item => (
    <LinkItem
      key={item.id}
      text={item.title}
      iconName={isSelected(item.id) ? 'check' : ''}
      selected={isSelected(item.id)}
      onClick={() => selectCategory(item.id)}
    />
  ));

  return (
    <>
      {isOpen && (
        <div>
          <List>
            <LinkItem
              text="Tudo"
              iconName={isSelected(-1) ? 'check' : ''}
              selected={isSelected(-1)}
              onClick={() => selectCategory(-1)}
            />
            { items }
          </List>
        </div>
      )}

      <Button onClick={() => openCategories()} type="button">Categorias</Button>
    </>
  );
};

CategoryFilterListBottom.propTypes = {
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
};

CategoryFilterListBottom.defaultProps = {
  categoryFilter: -1,
};

export default CategoryFilterListBottom;
