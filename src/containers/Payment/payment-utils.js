const calculateMoneyChange = ({ purchaseTotalValue, receivedValue }) => {
  if (receivedValue > purchaseTotalValue) {
    return receivedValue - purchaseTotalValue;
  }

  return 'Troco não pode ser menor que o valor de compra!';
};

export default {
  calculateMoneyChange,
};
