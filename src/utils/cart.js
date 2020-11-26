const sumCartQuantity = (cartItems) => {
  if (cartItems) return cartItems.reduce((total, item) => total + item.quantity, 0);
  return 0;
};
const sumCartTotalPrice = (cartItems) => {
  if (cartItems) {
    return cartItems.reduce(
      (total, item) => total + item.quantity * (item.pricing.modifiers + item.pricing.product),
      0,
    );
  }

  return 0;
};

export default {
  sumCartQuantity,
  sumCartTotalPrice,
};
