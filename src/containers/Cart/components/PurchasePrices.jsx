import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

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

const CouponRow = styled(PurchaseReviewRow)`
  color: #5bc057;
`;

const TotalRow = styled(PurchaseReviewRow)`
  color: #707070;
  font-weight: bold;
`;

const PurchasePrices = ({
  basketCountCart,
  totalCart,
  deliveryCost,
  couponValue,
  intl,
}) => {
  const total = totalCart + couponValue + (deliveryCost.cost || 0);
  const positiveTotal = total > 0 ? total : 0;
  const formatValue = value => intl.formatNumber(value, { style: 'currency', currency: 'BRL' });

  return (
    <PurchasePriceContainer>
      <PurchasePriceTitle>Resumo de compra</PurchasePriceTitle>
      <PurchaseReviewContainer>
        <ProductRow>
          <span>
            Produtos (
            {basketCountCart}
            ):
          </span>
          <span>{formatValue(totalCart)}</span>
        </ProductRow>
        {deliveryCost.isDeliverable && (
          <ProductRow>
            <span>Frete:</span>
            <span>{formatValue(deliveryCost.cost)}</span>
          </ProductRow>
        )}
        {/* Precisa esperar a API do cupom ficar pronta */}
        {process.env.NODE_ENV === 'development' && (
          <CouponRow>
            <span>Cupom:</span>
            <span>{formatValue(couponValue)}</span>
          </CouponRow>
        )}
        <TotalRow>
          <span>Total:</span>
          <span>{formatValue(positiveTotal)}</span>
        </TotalRow>
      </PurchaseReviewContainer>
    </PurchasePriceContainer>
  );
};

export default injectIntl(PurchasePrices);
