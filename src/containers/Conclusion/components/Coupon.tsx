import React, { useContext } from 'react';
import styled from 'styled-components';

import ShopContext from 'contexts/ShopContext';
import formatCurrency from 'utils/formatCurrency';

const Span = styled.span`
  color: #5bc057;
`;

const Coupon = () => {
  const { orderPlaced } = useContext(ShopContext);

  const { coupon } = orderPlaced;

  return (
    <>
      <Span>Cupom de desconto: </Span>
      <Span>{coupon.isPercentDiscountApplied ? `- ${coupon.totalAmount}%` : `- ${formatCurrency(coupon.totalAmount)}`}</Span>
    </>
  );
};

export default Coupon;
