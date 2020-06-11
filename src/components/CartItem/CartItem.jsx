import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import Counter from "components/Form/Counter";

import DeleteButton from "./components/DeleteButton";
import ItemImage from "./components/ItemImage";
import NoteButton from "./components/NoteButton";
import ItemObservation from "./components/ItemObservation";

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 15px 0;
  height: 100%;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    padding: 15px;
    border-bottom: 3px solid #eee;
  }
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

const AreaControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

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

const CartItem = props => {
  const { product, intl, deleteItem, updateAmount, prodIndex } = props;

  const variantName = product.variant.name ? `- ${product.variant.name}` : "";
  const productName = `${product.descricao} ${variantName}`;
  const productPrice = intl.formatNumber(
    (product.pricing.product + product.pricing.modifiers) * product.quantity,
    { style: "currency", currency: "BRL" }
  );
  const productDescription = product.modifiers.map((modifier, modIndex) =>
    modifier.map((item, index) =>
      modIndex || index ? ` | ${item.name} ` : item.name
    )
  );

  return (
    <ListItem>
      <>
        <div>
          <ItemImage product={product} />
          <div>
            <LabelItem>{"Produto"}</LabelItem>
            <TitleItem>{productName}</TitleItem>
            <ItemDescription>{productDescription}</ItemDescription>
          </div>
          <DeleteButton onClick={() => deleteItem(product.uuid)} />
        </div>
        {/* {product.note && product.note.length > 0 && (
            <NoteButton note={product.note} />
          )} */}
        <NoteButton note={product.note} />
        <ItemObservation id={product.uuid} />
        <AreaControl>
          <Counter
            limit={100}
            min={1}
            value={product.quantity}
            counter={amount => {
              updateAmount(amount, prodIndex);
            }}
          />
          <div>
            <LabelItem>{"Preço"}</LabelItem>
            <ItemPricing>{productPrice}</ItemPricing>
          </div>
        </AreaControl>
      </>
    </ListItem>
  );
};

CartItem.propTypes = {
  intl: intlShape.isRequired,
  product: PropTypes.shape({}).isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  prodIndex: PropTypes.number.isRequired
};

export default injectIntl(CartItem);
