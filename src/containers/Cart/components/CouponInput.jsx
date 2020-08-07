import React, { useContext, useState } from 'react';

import Input from 'components/Form/Input';
import Button from 'components/Form/Button';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ShopContext from 'contexts/ShopContext';

import { CouponContainer } from './cartFooterStyled';
import { checkingCoupon } from './cartFooterRequest';
import { calculateTotalCoupon } from './cartFooterUtils';

const CouponInput = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  const [coupon, setCoupon] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const [couponText] = useState('');

  const calculateCoupon = () => {
    if (!coupon.length) return;

    setLoadingCoupon(true);

    checkingCoupon(coupon, shop.id).then((response) => {
      let totalWithCoupon = null;
      const { totalAmount, isPercentDiscountApplied } = response.data.couponSelected;
      const { totalCart } = shoppingCart;

      if (isPercentDiscountApplied) {
        totalWithCoupon = calculateTotalCoupon(totalAmount, totalCart);
      } else {
        totalWithCoupon = totalCart - totalAmount;
      }

      updateShoppingCart({ totalCart: totalWithCoupon, coupon: response.data.couponSelected });
    }).catch((error) => {
      console.log(error.response);
    }).finally(() => {
      setLoadingCoupon(false);
    });
  };

  const handleChangeCoupon = ({ target }) => {
    setCoupon(target.value);
    updateShoppingCart({ coupon: target.value });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CouponContainer>
        <Input
          label="Cupom de desconto:"
          name="coupon"
          inputId="coupon"
          type="text"
          placeholder="Informe seu Cupom"
          onChange={handleChangeCoupon}
        />
        {couponText}
      </CouponContainer>
      <Button
        styleType="tertiary"
        value="Aplicar"
        isLoading={loadingCoupon}
        onClick={calculateCoupon}
      />
    </div>
  );
};

export default CouponInput;
