import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import formatCurrency from 'utils/formatCurrency';

const PurchaseReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const CouponRow = styled(PurchaseReviewRow)`
  color: #5bc057;
`;

const PurchasePrices = (props) => {
  const { couponValue } = props;

  return (
    <CouponRow>
      <span>Cupom:</span>
      <span>{formatCurrency(couponValue)}</span>
    </CouponRow>
  );
};

PurchasePrices.propTypes = {
  couponValue: PropTypes.number.isRequired,
};

export default PurchasePrices;
