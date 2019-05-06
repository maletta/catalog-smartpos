import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GenericItem from './GenericItem';

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const ItemText = (props) => {
  const { text, iconName, iconColor } = props;
  const icon = iconName ? (
    <Icon>
      <FontAwesomeIcon
        icon={iconName}
        color={iconColor}
        size="sm"
      />
    </Icon>
  ) : <Icon />;
  return (
    <GenericItem>
      {icon}
      {text}
    </GenericItem>
  );
};

ItemText.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.oneOfType([PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object]),
  iconColor: PropTypes.string,
};

ItemText.defaultProps = {
  iconName: undefined,
  iconColor: undefined,
};


export default ItemText;
