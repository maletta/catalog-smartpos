import React from 'react';
import styled from 'styled-components';

import formatCurrency from 'utils/formatCurrency';

const PurchaseReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const CouponRow = styled(PurchaseReviewRow)`
  color: #5bc057;
`;

type Props = {
  couponValue: number,
  isPercent: boolean
}

const PurchasePrices = (props: Props) => {
  const { isPercent, couponValue } = props;

  return (
    <CouponRow>
      <span>Cupom: </span>
      <span>{isPercent ? `- ${couponValue}%` : formatCurrency(couponValue)}</span>
    </CouponRow>
  );
};

export default PurchasePrices;
