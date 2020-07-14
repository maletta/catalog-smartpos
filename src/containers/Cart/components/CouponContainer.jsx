import React from 'react';
import styled from 'styled-components';

import Button from 'components/Form/Button';
import Input from 'components/Form/Input';

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
  const handleClick = () => { };

  return (
    <Coupon>
      <CouponInputButtonContainer>
        <CouponInputContainer>
          <Input label="Cupom de desconto:" />
        </CouponInputContainer>
        <Button styleType="tertiary" value="Aplicar" onClick={handleClick} />
      </CouponInputButtonContainer>
    </Coupon>
  );
};

export default CouponContainer;
