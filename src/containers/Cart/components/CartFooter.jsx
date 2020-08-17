import React, { useContext } from 'react';

import Grid from 'components/Grid';
import Row from 'components/Row';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import RadioButton from 'components/RadioGroup/RadioButton';

import { DeliveryContainer } from './cartFooterStyled';
import DeliveryCEPInput from './DeliveryCEPInput';
import AddMoreItemsButton from './AddMoreItemsButton';
import NextButton from './NextButton';
import CouponContainer from './CouponContainer';

const CartFooter = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  const handleChangeDelivery = ({ target }) => {
    updateShoppingCart({ withdraw: target.value === 'PICKUP' });
  };

  return (
    <>
      <Row>
        <Grid cols="12 6 6 6 6" className="d-flex justify-content-between flex-wrap">
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
          </DeliveryContainer>
        </Grid>
        <Grid cols="12 6 6 6 6">
          <p>Cupom de desconto:</p>
          <CouponContainer />
        </Grid>
      </Row>
      <Row>
        <Grid cols="12" className="d-flex justify-content-end mb-4">
          <AddMoreItemsButton />
          <NextButton />
        </Grid>
      </Row>
    </>
  );
};

export default CartFooter;
