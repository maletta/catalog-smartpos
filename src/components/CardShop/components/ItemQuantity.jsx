import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Quantity = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  margin-left: 20px;
`;

const QuantityText = styled.span`
  font-weight: 500;
  font-size: 10px;
  margin-left: 5px;
  margin-top: 20px;
  color: gray;
`;

const ControlQuantity = styled.div`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 2px;
  margin-top: 5px;
  margin-left: 2px;
  padding-left: 10px;
`;

const Controls = styled.div`
  color: var(--color-primary);
  margin-right: 10px;
  cursor: pointer;
`;

const ControlButton = styled.span`
  user-select: none;
  color: black;
`;

const ItemQuantity = (props) => {
  const { onRemove, onAdd, quantity } = props;
  const quantityText = 'Quantidade';

  return (
    <Quantity>
      <QuantityText>{quantityText}</QuantityText>
      <ControlQuantity>
        <Controls>
          <ControlButton onClick={onRemove}> - </ControlButton>
        </Controls>
        <Controls>
          {quantity}
        </Controls>
        <Controls>
          <ControlButton onClick={onAdd}> + </ControlButton>
        </Controls>
      </ControlQuantity>
    </Quantity>
  );
};

ItemQuantity.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ItemQuantity;
