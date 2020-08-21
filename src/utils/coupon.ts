type Coupon = {
  totalAmount?: number | undefined,
  isPercentDiscountApplied?: boolean | undefined,
  minimumPurchaseAmount?: number | undefined,
}

export const calculateDiscountCoupon = (coupon: Coupon, total: number): number => {
  if (!coupon.totalAmount || total <= coupon.totalAmount
    || (coupon.minimumPurchaseAmount && total < coupon.minimumPurchaseAmount)) {
    return 0;
  }

  const { totalAmount, isPercentDiscountApplied } = coupon;

  if (isPercentDiscountApplied) {
    return total * totalAmount / 100;
  }

  return totalAmount;
};

export const validateCoupon = (coupon: Coupon, total: number): boolean => {
  if (!coupon.totalAmount || total <= coupon.totalAmount
    || (coupon.minimumPurchaseAmount && total < coupon.minimumPurchaseAmount)) {
    return false;
  }

  return true;
};

export default {};
