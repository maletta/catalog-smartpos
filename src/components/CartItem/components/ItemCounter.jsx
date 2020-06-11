import React from "react";
// import styled from "styled-components";
// import PropTypes from "prop-types";
// import { injectIntl, intlShape } from "react-intl";

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

export default ItemCounter;
