import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from 'utils/formatCurrency';

const Delivery = (props) => {
  const { deliveryCost } = props;

  return (
    <>
      <span>Entrega</span>
      <span>{formatCurrency(deliveryCost)}</span>
    </>
  );
};

Delivery.propTypes = {
  deliveryCost: PropTypes.number.isRequired,
};

export default Delivery;
