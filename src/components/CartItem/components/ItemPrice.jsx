import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

const ItemPricing = styled.div`
  color: #333;
  font-size: 1.9rem;
  width: 170px;

  @media (max-width: 992px) {
    font-size: 1.5rem;
    width: 145px;
  }
`;

const LabelItem = styled.p`
  margin: 0;
`;

const ItemPrice = ({ product, intl }) => {
  const productPrice = intl.formatNumber(
    (product.pricing.product + product.pricing.modifiers) * product.quantity,
    { style: "currency", currency: "BRL" }
  );

  return (
    <>
      <LabelItem>{"Preço"}</LabelItem>
      <ItemPricing>{productPrice}</ItemPricing>
    </>
  );
};

ItemPrice.propTypes = {
  intl: intlShape.isRequired,
  product: PropTypes.shape({}).isRequired
};

export default injectIntl(ItemPrice);
