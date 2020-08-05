import React from 'react';
import styled from 'styled-components';

import EmptyCart from 'assets/emptyCart.svg';

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
`;

const EmptyTitle = styled.span`
  font-weight: 700;
  margin-top: 50px;
`;

const EmptySubTitle = styled.span`
  margin: 30px;
  margin-top: 10px;
  text-align: center;
`;

const EmptyCartMessage = () => {
  const emptyTitleText = 'Seu carrinho está vazio';
  const emptySubTitleText = 'Navegue pelo site e escolha os produtos desejados para adicionar em seu carrinho de compras.';

  return (
    <EmptyState>
      <img alt="empty" src={EmptyCart} width="180px" />
      <EmptyTitle>{emptyTitleText}</EmptyTitle>
      <EmptySubTitle>{emptySubTitleText}</EmptySubTitle>
    </EmptyState>
  );
};

export default EmptyCartMessage;
