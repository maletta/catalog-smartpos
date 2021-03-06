type Coupon = {
  totalAmount?: number | undefined,
  isPercentDiscountApplied?: boolean | undefined,
  minimumPurchaseAmount?: number | undefined,
}

export const calculateDiscountCoupon = (coupon: Coupon, total: number): number => {
  if (!coupon.totalAmount || (coupon.minimumPurchaseAmount && total < coupon.minimumPurchaseAmount)) {
    return 0;
  }

  const { totalAmount, isPercentDiscountApplied } = coupon;
  const totalDiscount = isPercentDiscountApplied ? total * totalAmount / 100 : totalAmount;

  return totalDiscount;
};

export const validateCoupon = (coupon: Coupon, total: number): boolean => {
  if (!coupon.totalAmount || (coupon.minimumPurchaseAmount && total < coupon.minimumPurchaseAmount)) {
    return false;
  }

  return true;
};

export default {};
