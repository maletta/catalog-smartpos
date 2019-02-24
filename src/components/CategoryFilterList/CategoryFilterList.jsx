import React, { Component } from 'react';
import PropTypes from 'prop-types';
import categories from 'categorias';
import { List, LinkItem } from 'components/List';

class CategoryFilterList extends Component {
  isSelected(item) {
    const { categoryFilter } = this.props;

    if (!item && !categoryFilter) {
      return true;
    }
    if ((item && !categoryFilter) || (!item && categoryFilter)) {
      return false;
    }
    return (item === categoryFilter);
  }

  render() {
    const items = categories.map(item => (
      <LinkItem
        key={item.id}
        text={item.title}
        iconName={this.isSelected(item.id) ? 'check' : ''}
        selected={this.isSelected(item.id)}
        onClick={() => this.props.onFilterCategory(item.id)}
      />
    ));
    return (
      <List title="Categorias">
        <LinkItem
          text="Tudo"
          iconName={this.isSelected(-1) ? 'check' : ''}
          selected={this.isSelected(-1)}
          onClick={() => this.props.onFilterCategory(-1)}
        />
        {items}
      </List>
    );
  }
}

CategoryFilterList.propTypes = {
  categoryFilter: PropTypes.number,
  onFilterCategory: PropTypes.func.isRequired,
};

CategoryFilterList.defaultProps = {
  categoryFilter: -1,
};


export default CategoryFilterList;
