import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Close from 'assets/close.svg';

const HeaderCard = styled.div`
  width: 100%;
  height: 45px;
  color: white;
  background-color: var(--color-header);
  display: flex;
  font-size: 14px;
  font-weight: 500;
  padding: 10px;
  margin-bottom: 10px;
`;

const CloseCart = styled.span`
  display: flex;
  flex: 1;
  padding-left: 80px;

  @media (max-width: 768px) {
    padding-left: 50px;
  }
`;

const TitleCart = styled.span`
  padding-left: 110px;

  @media (max-width: 768px) {
    padding-left: 90px;
  }
`;

const CloseIcon = styled.img`
  cursor: pointer;
`;

const CartHeader = (props) => {
  const { basketCount, onClose } = props;

  return (
    <HeaderCard>
      <TitleCart>{`Meu carrinho (${basketCount})`}</TitleCart>
      <CloseCart>
        <CloseIcon src={Close} width="15px" alt="fechar" onClick={onClose} />
      </CloseCart>
    </HeaderCard>
  );
};

CartHeader.propTypes = {
  basketCount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartHeader;
