import React, { useContext } from 'react';
import useRouterHook from 'utils/useRouterHook';
// import paths from 'paths';

import Button from 'components/Form/Button';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

import { shouldRedirectToNextStep } from './cartFooterUtils';

const NextButton = () => {
  const { shop } = useContext(ShopContext);
  const { shoppingCart } = useContext(ShoppingCartContext);
  const router = useRouterHook();

  const isNotDeliverable = shoppingCart.withdraw ? false : !shoppingCart.deliveryFee.isDeliverable;
  const checkPickup = () => {
    if (shop.deliveryMode === 'DELIVERY' && shoppingCart.deliveryFee.isDeliverable === false) return true;
    if (isNotDeliverable) return isNotDeliverable;
    return false;
  };

  return (
    <Button
      value="Próximo"
      onClick={() => shouldRedirectToNextStep(shop, router)}
      disabled={checkPickup()}
    />
  );
};

export default NextButton;
