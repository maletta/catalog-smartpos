import React, { Component } from 'react';
import { List, LinkItem } from 'components/List';
import orders from './orders';

class OrderOption extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: orders[0] };
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
    const items = orders.map(item => (
      <LinkItem
        key={item.id}
        text={item.title}
        iconName={this.isSelected(item) ? 'check' : ''}
        selected={this.isSelected(item)}
        onClick={() => this.selectCategory(item)}
      />
    ));
    return (
      <List title="Ordernar por">
        {items}
      </List>
    );
  }
}

OrderOption.propTypes = {
};

OrderOption.defaultProps = {
};


export default OrderOption;
