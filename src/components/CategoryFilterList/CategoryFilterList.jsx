import React from 'react';
import PropTypes from 'prop-types';

import { List, LinkItem } from 'components/List';
// A  aqui a request das categorias
import categories from 'categorias';

const CategoryFilterList = (props) => {
  const {
    categoryFilter,
    onFilterCategory,
  } = props;

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
      onClick={() => onFilterCategory(item.id)}
    />
  ));

  return (
    <List title="Categorias">
      <LinkItem
        text="Tudo"
        iconName={isSelected(-1, props.categoryFilter) ? 'check' : ''}
        selected={isSelected(-1, props.categoryFilter)}
        onClick={() => onFilterCategory(-1)}
      />
      {items}
    </List>
  );
};

CategoryFilterList.propTypes = {
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
};

CategoryFilterList.defaultProps = {
  categoryFilter: -1,
};

export default CategoryFilterList;
