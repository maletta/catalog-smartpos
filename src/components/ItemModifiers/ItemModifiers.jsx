import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import formatCurrency from 'utils/formatCurrency';
import Checkbox from 'components/Form/RenderCheckbox/RenderCheckbox';

const ModifierItem = styled.li`
  display: flex;
  padding: 10px 20px 10px 15px;
  justify-content: space-between;
`;

const ModifierItemName = styled.div`
  width: 80%;
`;

const ModifierItemSellValue = styled.span`
  margin: 0;
  display: block;
  color: #707070;
  font-size: 0.775rem;
  font-weight: 600;
`;

const ItemModifiers = (props) => {
  const {
    modifier,
    index,
    modifierSelected,
    setProductPricing,
    setModifierSelected,
    setModifiersErrors,
    modifiersErrors,
  } = props;
  const checkedItems = (isChecked, item) => {
    if (isChecked) {
      const removing = modifierSelected[index]
        .filter(itemChecked => (item.id !== itemChecked.id));
      setProductPricing(prevState => ({
        ...prevState,
        modifiers: (prevState.modifiers - item.sellValue),
      }));

      setModifierSelected((prevState) => {
        const newMod = prevState;
        newMod[index] = removing;
        return [...newMod];
      });

      if (modifier.required && modifierSelected[index].length <= 1) {
        modifiersErrors[index] = true;
        setModifiersErrors(modifiersErrors);
      } else if (modifier.required) {
        modifiersErrors[index] = false;
        setModifiersErrors(modifiersErrors);
      }
    } else if (modifierSelected[index].length < modifier.maxQuantity) {
      setProductPricing(prevState => ({
        ...prevState,
        modifiers: (prevState.modifiers + item.sellValue),
      }));

      setModifierSelected((prevState) => {
        prevState[index].push(item);
        return ([...prevState]);
      });

      if (modifier.required) {
        modifiersErrors[index] = false;
        setModifiersErrors(modifiersErrors);
      }
    }
  };

  return (
    modifier.itens.map((item) => {
      const isChecked = (modifierSelected[index] ? modifierSelected[index].includes(item) : false);
      const isAvailable = ((modifierSelected[index])
        && (modifierSelected[index].length + 1) <= modifier.maxQuantity);
      return (
        <ModifierItem key={item.id}>
          <ModifierItemName>
            {item.name}
            {(item.sellValue > 0) && (<ModifierItemSellValue>{` + ${formatCurrency(item.sellValue)}`}</ModifierItemSellValue>)}
          </ModifierItemName>
          <Checkbox
            input={{
              value: isChecked,
            }}
            disabled={(!isAvailable && !isChecked)}
            onChange={() => {
              checkedItems(isChecked, item);
            }}
          />
        </ModifierItem>
      );
    }));
};

ItemModifiers.propTypes = {
  modifierSelected: PropTypes.array.isRequired,
  modifiersErrors: PropTypes.array.isRequired,
  setProductPricing: PropTypes.func.isRequired,
  setModifierSelected: PropTypes.func.isRequired,
  setModifiersErrors: PropTypes.func.isRequired,
};

export default ItemModifiers;
