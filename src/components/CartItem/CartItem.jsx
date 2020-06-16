import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ItemInfo from "./components/ItemInfo";
import ItemCounter from "./components/ItemCounter";
import ItemPrice from "./components/ItemPrice";
import DeleteButton from "./components/DeleteButton";

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

const ItemFooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CartItem = props => {
  const { product, deleteItem, updateAmount, prodIndex } = props;

  return (
    <ListItem>
      <div style={{ width: "100%" }}>
        <ItemInfo product={product} deleteItem={deleteItem} />
      </div>
      <div style={{ width: "100%" }}>
        <ItemFooterContainer>
          <ItemCounter
            quantity={product.quantity}
            updateAmount={updateAmount}
            prodIndex={prodIndex}
          />
          <ItemPrice product={product} />
          {window.outerWidth > 768 && <DeleteButton onClick={deleteItem} />}
        </ItemFooterContainer>
      </div>
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
