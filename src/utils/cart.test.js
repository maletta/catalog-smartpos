import cart from './cart';

test('Soma quantidade total do carrinho', () => {
  const items = [
    { quantity: 1 },
    { quantity: 2 },
    { quantity: 3 },
    { quantity: 4 },
  ];
  const result = cart.sumCartQuantity(items);
  expect(result).toBe(10);
});

test('Soma o preço total do carrinho', () => {
  const items = [
    {
      quantity: 1,
      pricing: {
        modifiers: 10, product: 30,
      },
    },
    {
      quantity: 2,
      pricing: {
        modifiers: 20, product: 20,
      },
    },
    {
      quantity: 3,
      pricing: {
        modifiers: 30, product: 10,
      },
    },
  ];
  const result = cart.sumCartTotalPrice(items);
  expect(result).toBe(240);
});
