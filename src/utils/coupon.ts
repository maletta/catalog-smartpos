import lodash from 'lodash';

type Coupon = {
  totalAmount?: number | undefined,
  isPercentDiscountApplied?: boolean | undefined
}

export const calculateDiscountCoupon = (coupon: Coupon, total: number): number => {
  if (lodash.isEmpty(coupon) || !coupon.totalAmount) {
    return 0;
  }

  const { totalAmount, isPercentDiscountApplied } = coupon;

  if (isPercentDiscountApplied) {
    return total * totalAmount / 100;
  }

  return totalAmount;
};

export default {};
