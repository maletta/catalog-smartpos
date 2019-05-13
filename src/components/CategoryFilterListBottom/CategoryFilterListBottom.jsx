import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LinkItem } from 'components/List';

const Button = styled.button`
  position: relative;
  border: none;
  background: none;
  width: 100%;
  height: 48px;
  font-size: 1rem;
  color: #929292;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 55px;
  background: #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  width: 100%;
  border-radius: 5px;
  border: 1px solid #eee;
  z-index: 9;
`;

const List = styled.ul`
  padding: 10px 0;
  overflow-y: auto;
  height: 300px;
`;

const CategoryFilterListBottom = (props) => {
  const { onFilterCategory, categoryFilter, categories } = props;
  const [isOpen, setIsOpen] = useState(false);

  const openCategories = () => {
    setIsOpen(!isOpen);
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
      text={item.descricao}
      iconName={isSelected(item.id) ? 'check' : ''}
      selected={isSelected(item.id)}
      onClick={() => selectCategory(item.id)}
    />
  ));

  return (
    <>
      {isOpen && (
        <Dropdown>
          <List>
            <LinkItem
              text="Tudo"
              iconName={isSelected(-1) ? 'check' : ''}
              selected={isSelected(-1)}
              onClick={() => selectCategory(-1)}
            />
            { items }
          </List>
        </Dropdown>
      )}

      <Button onClick={() => openCategories()} type="button">Categorias</Button>
    </>
  );
};

CategoryFilterListBottom.propTypes = {
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

CategoryFilterListBottom.defaultProps = {
  categoryFilter: -1,
};

export default CategoryFilterListBottom;
