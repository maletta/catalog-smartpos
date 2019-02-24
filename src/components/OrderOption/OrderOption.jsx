import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, LinkItem } from 'components/List';
import orders from './orders';

class OrderOption extends Component {
  isSelected(item) {
    const { order } = this.props;
    if (!item && !order) {
      return true;
    }
    if ((item && !order) || (!item && order)) {
      return false;
    }
    return (item === order);
  }

  render() {
    const items = orders.map(item => (
      <LinkItem
        key={item.id}
        text={item.title}
        iconName={this.isSelected(item.id) ? 'check' : ''}
        selected={this.isSelected(item.id)}
        onClick={() => this.props.onChangeOrder(item.id)}
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
  order: PropTypes.string,
  onChangeOrder: PropTypes.func.isRequired,
};

OrderOption.defaultProps = {
  order: 'AZ',
};


export default OrderOption;
