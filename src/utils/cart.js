const sumCartQuantity = cartItems => cartItems.reduce((total, item) => total + item.quantity, 0);
const sumCartTotalPrice = cartItems => cartItems.reduce(
  (total, item) => total + item.quantity * (item.pricing.modifiers + item.pricing.product),
  0,
);

export default {
  sumCartQuantity,
  sumCartTotalPrice,
};
