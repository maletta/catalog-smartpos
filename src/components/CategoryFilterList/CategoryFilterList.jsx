import React, { Component } from 'react';
import categories from 'categorias';
import { List, LinkItem } from 'components/List';

class CategoryFilterList extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  selectCategory(item) {
    this.setState({ selected: item });
  }

  isSelected(item) {
    const { selected } = this.state;
    if (!item && !selected) {
      return true;
    }
    if ((item && !selected) || (!item && selected)) {
      return false;
    }
    return (item.id === selected.id);
  }

  render() {
    const items = categories.map(item => (
      <LinkItem
        key={item.id}
        text={item.title}
        iconName={this.isSelected(item) ? 'check' : ''}
        selected={this.isSelected(item)}
        onClick={() => this.selectCategory(item)}
      />
    ));
    return (
      <List title="Categorias">
        <LinkItem
          text="Tudo"
          iconName={this.isSelected() ? 'check' : ''}
          selected={this.isSelected()}
          onClick={() => this.selectCategory()}
        />
        {items}
      </List>
    );
  }
}

CategoryFilterList.propTypes = {
};

CategoryFilterList.defaultProps = {
};


export default CategoryFilterList;
