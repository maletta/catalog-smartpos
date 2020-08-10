import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import lodash from 'lodash';

import Input from 'components/Form/Input';
import Button from 'components/Form/Button';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ShopContext from 'contexts/ShopContext';

import { checkingCoupon } from './cartFooterRequest';

const Coupon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CouponInputButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CouponInputContainer = styled.div`
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const CouponContainer = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  const [coupon, setCoupon] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');

  const calculateCoupon = () => {
    if (!coupon.length) return;

    setLoadingCoupon(true);

    checkingCoupon(coupon, shop.id).then((response) => {
      const { couponSelected } = response.data;

      if (shoppingCart.totalCart < couponSelected.minimumPurchaseAmount) {
        setCouponError('Não atingiu valor mínimo da compra');
        return;
      }

      updateShoppingCart({ coupon: response.data.couponSelected });
      setCouponError('');
    }).catch((error) => {
      if (error.response.status === 404 || error.response.status === 400) {
        setCouponError('Cupom inválido');
      }
      updateShoppingCart({ coupon: {} });
    }).finally(() => {
      setLoadingCoupon(false);
    });
  };

  const handleChangeCoupon = ({ target }) => {
    setCoupon(target.value);

    if (!lodash.isEmpty(shoppingCart.coupon)) {
      updateShoppingCart({ coupon: {} });
    }
  };

  return (
    <Coupon>
      <CouponInputButtonContainer>
        <CouponInputContainer>
          <Input
            label=""
            name="coupon"
            inputId="coupon"
            type="text"
            placeholder="Cupom de desconto"
            isErrorHide
            onChange={handleChangeCoupon}
          />
        </CouponInputContainer>
        <Button
          styleType="tertiary"
          value="Aplicar"
          isLoading={loadingCoupon}
          onClick={calculateCoupon}
        />
      </CouponInputButtonContainer>
      {couponError}
    </Coupon>
  );
};

export default CouponContainer;
