import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from 'utils/formatCurrency';

const calculatePrice = (productPrice, modifierPrice, quantity) => {
  const sumPrice = productPrice + modifierPrice;
  return sumPrice * quantity;
};

const productPrice = (pricing, quantity) => {
  const { product, modifiers } = pricing;
  const total = calculatePrice(product, modifiers, quantity);
  return formatCurrency(total);
};

const ReceiptItem = (props) => {
  const { item } = props;
  const {
    descricao, quantity, pricing,
  } = item;

  const description = `${descricao} (x${quantity})`;

  return (
    <>
      <span>{description}</span>
      <span>{productPrice(pricing, quantity)}</span>
    </>
  );
};

ReceiptItem.propTypes = {
  item: PropTypes.any.isRequired,
};

export default ReceiptItem;
