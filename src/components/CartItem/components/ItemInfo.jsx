import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ItemImage from "./ItemImage";
import DeleteButton from "./DeleteButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleItem = styled.h2`
  font-weight: 400;
  color: #363636;
  margin: 0;

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const ItemDescription = styled.span`
  color: #333;
  font-size: 0.9rem;

  @media (max-width: 992px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 0.4rem;
  }
`;

const LabelItem = styled.p`
  margin: 0;
`;

const ButtonContainer = styled.div`
  flex-grow: 1;
`;

const ItemInfo = ({ product, deleteItem }) => {
  const variantName = product.variant.name ? `- ${product.variant.name}` : "";
  const productName = `${product.descricao} ${variantName}`;
  const productDescription = product.modifiers.map((modifier, modIndex) =>
    modifier.map((item, index) =>
      modIndex || index ? ` | ${item.name} ` : item.name
    )
  );

  return (
    <Container>
      <ItemImage product={product} />
      <ButtonContainer>
        <LabelItem>{"Produto"}</LabelItem>
        <TitleItem>{productName}</TitleItem>
        <ItemDescription>{productDescription}</ItemDescription>
      </ButtonContainer>
      <DeleteButton onClick={() => deleteItem(product.uuid)} />
    </Container>
  );
};

ItemInfo.propTypes = {
  product: PropTypes.shape({}).isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default ItemInfo;
