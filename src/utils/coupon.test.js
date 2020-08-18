import { calculateDiscountCoupon, calculateDiscountPercent } from './coupon';

test('Calcula o valor de disconto do cupom quando não existe cupom', () => {
  const coupon = {};

  const result = calculateDiscountCoupon(coupon, 350);
  expect(result).toBe(0);
});

test('Calcula o valor de disconto do cupom quando o cupom é por valor', () => {
  const coupon = {
    couponStatus: 'OPENED',
    expirationDate: '2020-08-20',
    isPercentDiscountApplied: false,
    minimumPurchaseAmount: 50,
    name: 'teste2',
    totalAmount: 10,
  };

  const result = calculateDiscountCoupon(coupon, 350);
  expect(result).toBe(10);
});

test('Calcula o valor de disconto do cupom quando o cupom é por porcentagem', () => {
  const coupon = {
    couponStatus: 'OPENED',
    expirationDate: '2020-08-20',
    isPercentDiscountApplied: true,
    minimumPurchaseAmount: 50,
    name: 'teste2',
    totalAmount: 10,
  };

  const result = calculateDiscountCoupon(coupon, 350);
  expect(result).toBe(35);
});

test('Calcula o valor do disconto do cupom pela porcentagem em cada parcela', () => {
  const coupon = {
    couponStatus: 'OPENED',
    expirationDate: '2020-08-20',
    isPercentDiscountApplied: false,
    minimumPurchaseAmount: 50,
    name: 'teste2',
    totalAmount: 10,
  };

  const result = calculateDiscountPercent(coupon, 25, 50);
  expect(result).toBe(5);
});
