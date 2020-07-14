import React from 'react';
import styled from 'styled-components';

import CartItem from 'components/CartItem';

const Title = styled.h1`
  color: #212121;
  font-size: 24px;
`;

const Container = styled.div`
  padding-left: 20px;
`;

const CartItems = (props) => {
  const { cartItems, deleteItem, updateAmount } = props;

  return (
    <Container>
      <Title>Resumo do pedido</Title>
      <ul>
        {cartItems.map((product, prodIndex) => (
          <CartItem
            key={product.uuid}
            product={product}
            prodIndex={prodIndex}
            deleteItem={deleteItem}
            updateAmount={updateAmount}
          />
        ))}
      </ul>
    </Container>
  );
};

export default CartItems;
