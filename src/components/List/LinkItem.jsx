import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const Button = styled.button`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  color: ${props => props.color || props.theme.secondary} !important;
`;


class LinkItem extends Component {
  render() {
    const {
      text, iconName, onClick, selected,
    } = this.props;
    const icon = iconName ? (
      <Icon>
        <FontAwesomeIcon
          icon={iconName}
          color={selected ? '#6DB65B' : '#929292'}
          size="sm"
        />
      </Icon>
    ) : <Icon />;
    return (
      <li>
        <Button color={selected ? '#6DB65B' : '#929292'} onClick={onClick}>
          {icon}
          {text}
        </Button>
      </li>
    );
  }
}

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
