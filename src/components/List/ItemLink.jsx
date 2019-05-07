import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GenericItem from './GenericItem';

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const Link = styled.span`
  display: inline-block !important;
  color: ${props => props.iconColor};
`;

const ItemLink = (props) => {
  const {
    text,
    link,
    iconName,
    iconColor,
  } = props;
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
      <Link href={link} target="_blank" rel="noopener noreferrer">{text}</Link>
    </GenericItem>
  );
};

ItemLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  iconName: PropTypes.oneOfType([PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object]),
  iconColor: PropTypes.string,
};

ItemLink.defaultProps = {
  iconName: undefined,
  iconColor: undefined,
};


export default ItemLink;
