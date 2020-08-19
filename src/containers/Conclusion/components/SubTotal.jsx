import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from 'utils/formatCurrency';

const SubTotal = (props) => {
  const { subTotal } = props;

  return (
    <>
      <span>Total</span>
      <span>{formatCurrency(subTotal)}</span>
    </>
  );
};

SubTotal.propTypes = {
  subTotal: PropTypes.number.isRequired,
};

export default SubTotal;
