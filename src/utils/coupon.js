import lodash from 'lodash';

export const calculateDiscountCoupon = (coupon, total) => {
  if (lodash.isEmpty(coupon)) {
    return 0;
  }

  const { totalAmount, isPercentDiscountApplied } = coupon;

  if (isPercentDiscountApplied) {
    return total * (totalAmount / 100);
  }

  return totalAmount;
};

export const calculateDiscountCouponPercent = (coupon, totalInstallment, totalCart) => {
  if (lodash.isEmpty(coupon)) {
    return 0;
  }

  const { totalAmount, isPercentDiscountApplied } = coupon;

  if (isPercentDiscountApplied) {
    return totalInstallment * (totalAmount / 100);
  }

  const percent = (totalAmount / totalCart) * 100;

  return totalInstallment * (percent / 100);
};

export default {};
