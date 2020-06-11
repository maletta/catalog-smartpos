import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import NoteButton from "./components/NoteButton";
import ItemObservation from "./components/ItemObservation";
import ItemInfo from "./components/ItemInfo";
import ItemCounter from "./components/ItemCounter";

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

  const productPrice = intl.formatNumber(
    (product.pricing.product + product.pricing.modifiers) * product.quantity,
    { style: "currency", currency: "BRL" }
  );
  const hasNote = product.note && product.note.length > 0;

  return (
    <ListItem>
      <ItemInfo product={product} deleteItem={deleteItem} />
      {hasNote && <NoteButton note={product.note} />}
      <NoteButton note={product.note} />
      <ItemObservation id={product.uuid} />
      <ItemCounter
        quantity={product.quantity}
        updateAmount={updateAmount}
        prodIndex={prodIndex}
      />
      <LabelItem>{"Preço"}</LabelItem>
      <ItemPricing>{productPrice}</ItemPricing>
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
