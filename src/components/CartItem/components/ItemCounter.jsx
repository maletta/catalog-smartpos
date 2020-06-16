import React from "react";
import PropTypes from "prop-types";

import Counter from "components/Form/Counter";

const ItemCounter = ({ quantity, updateAmount, prodIndex }) => {
  return (
    <Counter
      limit={100}
      min={1}
      value={quantity}
      counter={amount => {
        updateAmount(amount, prodIndex);
      }}
    />
  );
};

ItemCounter.propTypes = {
  quantity: PropTypes.number,
  updateAmount: PropTypes.func,
  prodIndex: PropTypes.number
};

export default ItemCounter;
