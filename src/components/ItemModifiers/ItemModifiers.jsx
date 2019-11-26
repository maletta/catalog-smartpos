import React from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';

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

const ItemModifiers = ({ modifier, hasError, propsForm, index, intl, modifierSelected }) => {

  return (
    modifier.itens.map((item) => {
      const isChecked = modifierSelected[index].includes(item);
      const isAvailable = ((modifierSelected[index].length + 1) <= modifier.maxQuantity);
      return (
        <ModifierItem key={item.id}>
          <ModifierItemName>
            {item.name}
            {(item.sellValue > 0) && (<ModifierItemSellValue>{` + ${intl.formatNumber(item.sellValue, { style: 'currency', currency: 'BRL' })}`}</ModifierItemSellValue>)}
          </ModifierItemName>
          <Checkbox
            input={{
              value: isChecked,
            }}
            disabled={(!isAvailable && !isChecked)}
          />
        </ModifierItem>
      );
    }));
};

ItemModifiers.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ItemModifiers);
