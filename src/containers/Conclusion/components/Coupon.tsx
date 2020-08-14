import React from 'react';
import styled from 'styled-components';

import formatCurrency from 'utils/formatCurrency';

const Span = styled.span`
  color: #5bc057;
`;

type Props = {
  couponValue: number,
  isPercent: boolean
}

const Coupon = (props: Props) => {
  const { couponValue, isPercent } = props;

  return (
    <>
      <Span>Cupom de desconto: </Span>
      <Span>{isPercent ? `- ${couponValue}%` : `- ${formatCurrency(couponValue)}`}</Span>
    </>
  );
};

export default Coupon;
