import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import formatCurrency from 'utils/formatCurrency';
import { calculateTotalCoupon } from './cartFooterUtils';

import CouponPriceContainer from './CouponPriceContainer';
import CouponContainer from './CouponContainer';

const PurchasePriceTitle = styled.h2`
  color: #707070;
  font-size: 25px;
`;

const PurchasePriceContainer = styled.div`
  padding: 30px 0;
  height: 100%;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PurchaseReviewContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`;

const PurchaseReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const ProductRow = styled(PurchaseReviewRow)`
  color: #707070;
`;

const TotalRow = styled(PurchaseReviewRow)`
  color: #707070;
  font-weight: bold;
`;

const CouponArea = styled.div`
  display: flex;
  margin-top: 20px;
`;

const PurchasePrices = ({
  basketCountCart,
  totalCart,
  deliveryCost,
  coupon,
}) => {
  const couponValue = coupon.isPercentDiscountApplied
    ? calculateTotalCoupon(coupon.totalAmount, totalCart) : coupon.totalAmount || 0;

  const total = totalCart - couponValue + deliveryCost.cost;
  const positiveTotal = total > 0 ? total : 0;

  return (
    <PurchasePriceContainer>
      <PurchasePriceTitle>Resumo de compra</PurchasePriceTitle>
      <PurchaseReviewContainer>
        <ProductRow>
          <span>
            {`Produtos (${basketCountCart})`}
          </span>
          <span>{formatCurrency(totalCart)}</span>
        </ProductRow>
        {deliveryCost.isDeliverable && (
          <ProductRow>
            <span>Frete:</span>
            <span>{formatCurrency(deliveryCost.cost)}</span>
          </ProductRow>
        )}
        {couponValue > 0 && (
          <CouponPriceContainer
            couponValue={coupon.totalAmount}
            isPercent={coupon.isPercentDiscountApplied}
          />
        )}
        <TotalRow>
          <span>Total:</span>
          <span>{formatCurrency(positiveTotal)}</span>
        </TotalRow>
        <CouponArea>
          <CouponContainer />
        </CouponArea>
      </PurchaseReviewContainer>
    </PurchasePriceContainer>
  );
};

PurchasePrices.propTypes = {
  basketCountCart: PropTypes.number.isRequired,
  totalCart: PropTypes.number.isRequired,
  deliveryCost: PropTypes.any.isRequired,
  coupon: PropTypes.any.isRequired,
};

export default PurchasePrices;
