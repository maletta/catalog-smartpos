import React from 'react';
import styled from 'styled-components';

const SuccessMessage = styled.span`
  color: #94d470;
  font-weight: bold;
  font-size: 20px;
`;

const SuccessMessageContainer = () => (
  <SuccessMessage>

    Seu pedido foi finalizado com sucesso
  </SuccessMessage>
);

export default SuccessMessageContainer;
