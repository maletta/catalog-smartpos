import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyleSpan = styled.span`
  color: #00529b;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
`;

const AddressCreditCard = ({ onClick }) => (
  <>
    <StyleSpan onClick={onClick}>

      Endereço do cartão é diferente do endereço de entrega?
    </StyleSpan>
  </>
);

AddressCreditCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddressCreditCard;
