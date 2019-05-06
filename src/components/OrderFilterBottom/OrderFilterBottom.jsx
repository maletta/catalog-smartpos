import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled.span`
  font-size: 18px;
  display: inline-block;
  padding: 8px;
`;

const OrderFilterBottom = (props) => {
  const { order, onChangeOrder } = props;

  const toggleOrder = () => {
    if (order === 'AZ') {
      return 'ZA';
    }
    if (order === 'ZA') {
      return 'LESS';
    }
    if (order === 'LESS') {
      return 'GREATER';
    }
    return 'AZ';
  };

  return (
    <Icon onClick={() => onChangeOrder(toggleOrder())}>
      <FontAwesomeIcon
        icon="sort"
        size="lg"
      />
    </Icon>
  );
};

OrderFilterBottom.propTypes = {
  order: PropTypes.string,
  onChangeOrder: PropTypes.func.isRequired,
};

OrderFilterBottom.defaultProps = {
  order: 'AZ',
};


export default OrderFilterBottom;
