import React, { useContext } from 'react';
import styled from 'styled-components';

import FilterContext from 'contexts/FilterContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled.span`
  font-size: 18px;
  display: inline-block;
  padding: 8px;
`;

const OrderFilterBottom = () => {
  const { updateFilter } = useContext(FilterContext);
  return (
    <Icon onClick={() => updateFilter({ orderBy: 'asc' })}>
      <FontAwesomeIcon
        icon="sort"
        size="lg"
      />
    </Icon>
  );
};


export default OrderFilterBottom;
