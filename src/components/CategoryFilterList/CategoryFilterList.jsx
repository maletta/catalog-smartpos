import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';

import { List, LinkItem } from 'components/List';

const CategoryFilterList = (props) => {
  const {
    categoryFilter,
    categoriesList,
    loading,
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

  const items = categoriesList.map(item => (
    <LinkItem
      key={item.id}
      text={item.descricao}
      iconName={isSelected(item.id) ? 'check' : ''}
      selected={isSelected(item.id)}
      onClick={() => ''}
    />
  ));

  return (
    <List title="Categorias">
      <LinkItem
        text="Tudo"
        iconName={isSelected(-1, props.categoryFilter) ? 'check' : ''}
        selected={isSelected(-1, props.categoryFilter)}
        onClick={() => ''}
      />
      {loading ? <Spinner /> : items}
    </List>
  );
};

CategoryFilterList.propTypes = {
  categoryFilter: PropTypes.number,
  categoriesList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

CategoryFilterList.defaultProps = {
  categoryFilter: -1,
};

export default CategoryFilterList;
