import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import lodash from 'lodash';
import Swal from 'sweetalert2';

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

  const [couponName, setCouponName] = useState(shoppingCart.coupon.name || '');
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const [couponText, setCouponText] = useState('');

  const calculateCoupon = () => {
    if (!couponName) return;

    setLoadingCoupon(true);

    checkingCoupon(couponName, shop.id).then((response) => {
      const { coupon } = response.data;

      if (shoppingCart.totalCart < coupon.minimumPurchaseAmount) {
        setCouponText('Não atingiu valor mínimo da compra');
        updateShoppingCart({ coupon: {} });
        return;
      }

      updateShoppingCart({ coupon });
      setCouponText('');
    }).catch((error) => {
      updateShoppingCart({ coupon: {} });
      if (error.response.status === 404 || error.response.status === 400) {
        setCouponText('Cupom inválido');
        return;
      }
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Erro ao consultar cupom',
      });
    }).finally(() => {
      setLoadingCoupon(false);
    });
  };

  const handleChangeCoupon = ({ target }) => {
    setCouponName(target.value);

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
            value={couponName}
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
      {couponText}
    </Coupon>
  );
};

export default CouponContainer;
