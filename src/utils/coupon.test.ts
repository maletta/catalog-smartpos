import { calculateDiscountCoupon, validateCoupon } from './coupon';

test('Calcula o valor de desconto do cupom quando não existe cupom', () => {
  const coupon = {};

  const result = calculateDiscountCoupon(coupon, 350);
  expect(result).toBe(0);
});

test('Calcula o valor de desconto do cupom quando o cupom é por valor', () => {
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

test('Calcula o valor de desconto do cupom quando o cupom é por porcentagem', () => {
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

test('Verifica se existe o cupom', () => {
  const coupon = {};

  const result = validateCoupon(coupon, 350);
  expect(result).toBe(false);
});

test('Verifica se o valor da compra é menor que o valor do cupom pelo calculo de porcentagem', () => {
  const coupon = {
    couponStatus: 'OPENED',
    expirationDate: '2020-08-20',
    isPercentDiscountApplied: true,
    minimumPurchaseAmount: 50,
    name: 'teste2',
    totalAmount: 99,
  };

  const result = validateCoupon(coupon, 60);
  expect(result).toBe(true);
});

test('Verifica se o valor da compra é menor que o valor do cupom', () => {
  const coupon = {
    couponStatus: 'OPENED',
    expirationDate: '2020-08-20',
    isPercentDiscountApplied: false,
    minimumPurchaseAmount: 50,
    name: 'teste2',
    totalAmount: 60,
  };

  const result = validateCoupon(coupon, 61);
  expect(result).toBe(true);
});
