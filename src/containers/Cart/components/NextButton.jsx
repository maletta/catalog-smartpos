import React, { useContext } from 'react';

import Button from 'components/Form/Button';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

import { shouldRedirectToNextStep } from './cartFooterUtils';

const NextButton = () => {
  const { shop } = useContext(ShopContext);
  const { shoppingCart } = useContext(ShoppingCartContext);

  const isNotDeliverable = shoppingCart.withdraw ? false : !shoppingCart.deliveryFee.isDeliverable;

  return (
    <Button
      value="Próximo"
      onClick={() => shouldRedirectToNextStep(shop)}
      disabled={isNotDeliverable}
    />
  );
};

export default NextButton;
