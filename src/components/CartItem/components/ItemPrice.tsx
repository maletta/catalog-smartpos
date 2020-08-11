import React from 'react';
import styled from 'styled-components';

import formatCurrency from 'utils/formatCurrency';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ItemPricing = styled.div`
  color: #333;
  font-size: 1.9rem;

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }
`;

const LabelItem = styled.p`
  align-self: flex-start;
  margin: 0;
`;

type Pricing = {
  product: number
  modifiers: number
};

type Product = {
  pricing: Pricing
  quantity: number
};

type Props = {
  product: Product
};

const ItemPrice = ({ product }: Props) => {
  const productPrice = formatCurrency(
    (product.pricing.product + product.pricing.modifiers) * product.quantity,
  );

  return (
    <Container>
      <LabelItem>Valor</LabelItem>
      <ItemPricing>{productPrice}</ItemPricing>
    </Container>
  );
};

export default ItemPrice;
