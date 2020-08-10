import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import Input from 'components/Form/Input';
import Button from 'components/Form/Button';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ShopContext from 'contexts/ShopContext';

import { checkingCoupon } from './cartFooterRequest';

const Coupon = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const CouponInputButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CouponInputContainer = styled.div`
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const CouponContainer = () => {
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  const [coupon, setCoupon] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const [couponError, setCouponError] = useState('');

  const calculateCoupon = () => {
    if (!coupon.length) return;

    setLoadingCoupon(true);

    checkingCoupon(coupon, shop.id).then((response) => {
      updateShoppingCart({ coupon: response.data.couponSelected });
    }).catch((error) => {
      setCouponError(error.response.data.message);
    }).finally(() => {
      setLoadingCoupon(false);
    });
  };

  const handleChangeCoupon = ({ target }) => {
    setCoupon(target.value);
    updateShoppingCart({ coupon: target.value });
  };

  return (
    <Coupon>
      <CouponInputButtonContainer>
        <CouponInputContainer>
          <Input
            label="Cupom de desconto:"
            name="coupon"
            inputId="coupon"
            type="text"
            placeholder="Informe seu Cupom"
            onChange={handleChangeCoupon}
          />
          {couponError}
        </CouponInputContainer>
        <Button
          styleType="tertiary"
          value="Aplicar"
          isLoading={loadingCoupon}
          onClick={calculateCoupon}
        />
      </CouponInputButtonContainer>
    </Coupon>
  );
};

export default CouponContainer;
