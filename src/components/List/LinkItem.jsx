import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.a`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #666;
  font-weight: 400;
`;

const Li = styled.li`
  margin: 0 0 3px;
`;

const LinkItem = (props) => {
  const {
    text,
    onClick,
    selected,
  } = props;
  return (
    <Li>
      <Button title={text} color={selected ? '#F38A00' : '#929292'} onClick={onClick}>
        {text}
      </Button>
    </Li>
  );
};

LinkItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

LinkItem.defaultProps = {
  selected: false,
};


export default LinkItem;
