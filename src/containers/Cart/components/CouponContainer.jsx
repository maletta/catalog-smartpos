import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import Input from 'components/Form/Input';
import Button from 'components/Form/Button';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ShopContext from 'contexts/ShopContext';

import { checkingCoupon } from './cartFooterRequest';

const CouponInputContainer = styled.div`
  margin-bottom: 20px;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const CouponContainer = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);
  const { name } = shoppingCart.coupon;

  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [couponText, setCouponText] = useState('');

  const calculateCoupon = () => {
    if (!name) return;

    setLoadingCoupon(true);

    checkingCoupon(name, shop.id).then((response) => {
      const { coupon } = response.data;

      if ((coupon.minimumPurchaseAmount
        && shoppingCart.totalCart < coupon.minimumPurchaseAmount)
        || shoppingCart.totalCart <= coupon.totalAmount) {
        setCouponText('Não atingiu valor mínimo da compra');
        updateShoppingCart({ coupon: { name }});
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
    updateShoppingCart({ coupon: { name: target.value } });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <CouponInputContainer>
        <Input
          label=""
          name="coupon"
          inputId="coupon"
          value={name}
          type="text"
          placeholder="Cupom de desconto"
          onChange={handleChangeCoupon}
        />
        {couponText}
      </CouponInputContainer>
      <Button
        styleType="tertiary"
        value="Aplicar"
        isLoading={loadingCoupon}
        onClick={calculateCoupon}
      />
    </div>
  );
};

export default CouponContainer;
