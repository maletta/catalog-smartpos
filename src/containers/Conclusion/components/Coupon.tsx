import React from 'react';

import formatCurrency from 'utils/formatCurrency';

type Props = {
  couponValue: number,
  isPercent: boolean
}

const Coupon = (props: Props) => {
  const { couponValue, isPercent } = props;

  return (
    <>
      <span>Cupom de desconto</span>
      <span>{isPercent ? `-${couponValue}%` : `-${formatCurrency(couponValue)}`}</span>
    </>
  );
};

export default Coupon;
