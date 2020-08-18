import lodash from 'lodash';

type Coupon = {
  totalAmount: number,
  isPercentDiscountApplied: boolean
}

export const calculateDiscountCoupon = (coupon: Coupon, total: number): number => {
  if (lodash.isEmpty(coupon)) {
    return 0;
  }

  const { totalAmount, isPercentDiscountApplied } = coupon;

  if (isPercentDiscountApplied) {
    return total * totalAmount / 100;
  }

  return totalAmount;
};

export const calculateDiscountPercent = (coupon: Coupon, totalInstallment: number, totalCart: number): number => {
  if (lodash.isEmpty(coupon)) {
    return 0;
  }

  const { totalAmount, isPercentDiscountApplied } = coupon;

  if (isPercentDiscountApplied) {
    return totalInstallment * totalAmount / 100;
  }

  return totalInstallment * totalAmount / totalCart;
};

export default {};
