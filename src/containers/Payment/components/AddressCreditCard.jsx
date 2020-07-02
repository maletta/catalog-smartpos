import React from 'react';
import styled from 'styled-components';

const StyleSpan = styled.span`
  color: #00529b;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
`;

const AddressCreditCard = ({ onClick }) => {
  return (
    <>
      <StyleSpan onClick={onClick}>
        Endereço do cartão é diferente do endereço de entrega?
      </StyleSpan>
    </>
  );
};

export default AddressCreditCard;
