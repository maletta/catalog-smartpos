import React from 'react';
import PropTypes from 'prop-types';

import Counter from 'components/Form/Counter';

const ItemCounter = ({ quantity, updateAmount, prodIndex }) => (
  <Counter
    initialCount={quantity}
    setState={(amount) => {
      updateAmount(amount, prodIndex);
    }}
  />
);

ItemCounter.propTypes = {
  quantity: PropTypes.number.isRequired,
  updateAmount: PropTypes.func.isRequired,
  prodIndex: PropTypes.number.isRequired,
};

export default ItemCounter;
