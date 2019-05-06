import React from 'react';
import PropTypes from 'prop-types';
import { List, LinkItem } from 'components/List';
import orders from './orders';

const OrderOption = (props) => {
  const { order, onChangeOrder } = props;
  const isSelected = (item) => {
    if (!item && !order) {
      return true;
    }
    if ((item && !order) || (!item && order)) {
      return false;
    }
    return (item === order);
  };

  const items = orders.map(item => (
    <LinkItem
      key={item.id}
      text={item.title}
      iconName={isSelected(item.id) ? 'check' : ''}
      selected={isSelected(item.id)}
      onClick={() => onChangeOrder(item.id)}
    />
  ));
  return (
    <List title="Ordernar por">
      {items}
    </List>
  );
};

OrderOption.propTypes = {
  order: PropTypes.string,
  onChangeOrder: PropTypes.func.isRequired,
};

OrderOption.defaultProps = {
  order: 'AZ',
};


export default OrderOption;
