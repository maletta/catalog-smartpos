import React, { useContext } from 'react';

import Grid from 'components/Grid';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import RadioButton from 'components/RadioGroup/RadioButton';

import { DeliveryContainer } from './cartFooterStyled';
import DeliveryCEPInput from './DeliveryCEPInput';
import CouponInput from './CouponInput';
import AddMoreItemsButton from './AddMoreItemsButton';
import NextButton from './NextButton';

const CartFooter = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  const handleChangeDelivery = ({ target }) => {
    updateShoppingCart({ withdraw: target.value === 'PICKUP' });
  };

  return (
    <>
      <Grid cols="12" className="d-flex justify-content-between flex-wrap">
        <DeliveryContainer>
          <p>Entrega:</p>
          {shop.deliveryMode !== 'DELIVERY' && (
            <RadioButton
              name="delivery-radio"
              label="Retirar no local"
              value="PICKUP"
              checked={shoppingCart.withdraw}
              onChange={handleChangeDelivery}
            />
          )}
          {shop.deliveryMode !== 'PICKUP' && (
            <RadioButton
              name="delivery-radio"
              label="Calcular frete"
              value="DELIVERY"
              checked={!shoppingCart.withdraw}
              onChange={handleChangeDelivery}
            />
          )}
          {!shoppingCart.withdraw && <DeliveryCEPInput />}

          <CouponInput />
        </DeliveryContainer>
      </Grid>
      <Grid cols="12" className="d-flex justify-content-end mb-4">
        <AddMoreItemsButton />
        <NextButton />
      </Grid>
    </>
  );
};

export default CartFooter;
