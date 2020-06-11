import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import NoteButton from "./components/NoteButton";
import ItemObservation from "./components/ItemObservation";
import ItemInfo from "./components/ItemInfo";
import ItemCounter from "./components/ItemCounter";
import ItemPrice from "./components/ItemPrice";

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

const CartItem = props => {
  const { product, deleteItem, updateAmount, prodIndex } = props;

  return (
    <ListItem>
      <ItemInfo product={product} deleteItem={deleteItem} />
      <NoteButton product={product} />
      <ItemObservation id={product.uuid} />
      <ItemCounter
        quantity={product.quantity}
        updateAmount={updateAmount}
        prodIndex={prodIndex}
      />
      <ItemPrice product={product} />
    </ListItem>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({}).isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  prodIndex: PropTypes.number.isRequired
};

export default CartItem;
