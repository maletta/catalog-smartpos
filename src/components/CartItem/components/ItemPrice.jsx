import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

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

const ItemPrice = ({ product, intl }) => {
  const productPrice = intl.formatNumber(
    (product.pricing.product + product.pricing.modifiers) * product.quantity,
    { style: "currency", currency: "BRL" }
  );

  return (
    <Container>
      <LabelItem>{"Valor"}</LabelItem>
      <ItemPricing>{productPrice}</ItemPricing>
    </Container>
  );
};

ItemPrice.propTypes = {
  intl: intlShape.isRequired,
  product: PropTypes.shape({}).isRequired
};

export default injectIntl(ItemPrice);
