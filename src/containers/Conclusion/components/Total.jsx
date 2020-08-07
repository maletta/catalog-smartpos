import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from 'utils/formatCurrency';

const Total = (props) => {
  const { total } = props;

  return (
    <>
      <span>Final:</span>
      <span>{formatCurrency(total)}</span>
    </>
  );
};

Total.propTypes = {
  total: PropTypes.number.isRequired,
};

export default Total;
