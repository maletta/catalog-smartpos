import React, { useContext, useState, useEffect } from 'react';

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
import { checkingForOpenCoupons } from './cartFooterRequest';

const CartFooter = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  const [displayCoupon, setDisplayCoupon] = useState(false);

  const handleChangeDelivery = ({ target }) => {
    updateShoppingCart({ withdraw: target.value === 'PICKUP' });
  };

  useEffect(() => {
    checkingForOpenCoupons(shop.id).then((response) => {
      const { openCoupons } = response.data;

      if (openCoupons) {
        setDisplayCoupon(true);
      }
    }).catch(() => {
      setDisplayCoupon(false);
    });
  }, []);

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
        {displayCoupon && (
          <Grid cols="12 6 6 6 6">
            <p>Cupom de desconto:</p>
            <CouponContainer />
          </Grid>
        )}
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
