import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const Button = styled.a`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  color: ${props => props.color || props.theme.secondary} !important;
  cursor: pointer;
`;


const LinkItem = (props) => {
  const {
    text,
    iconName,
    onClick,
    selected,
  } = props;
  const icon = iconName ? (
    <Icon>
      <FontAwesomeIcon
        icon={iconName}
        color={selected ? '#F38A00' : '#929292'}
        size="sm"
      />
    </Icon>
  ) : <Icon />;
  return (
    <li>
      <Button color={selected ? '#F38A00' : '#929292'} onClick={onClick}>
        {icon}
        {text}
      </Button>
    </li>
  );
};

LinkItem.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.oneOfType([PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object]),
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

LinkItem.defaultProps = {
  iconName: undefined,
  selected: false,
};


export default LinkItem;
