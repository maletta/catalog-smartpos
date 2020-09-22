import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.a`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: ${props => (props.selected ? 'var(--links-secondary)' : 'var(--links-primary)')} !important;
`;

const Li = styled.li`
  margin: 0 0 3px;
  cursor: pointer;
`;

const LinkItem = (props) => {
  const {
    text,
    onClick,
    selected,
    id,
  } = props;
  return (
    <Li>
      <Button
        title={text}
        selected={selected}
        onClick={onClick}
        className={`category-${id}`}
      >
        {text}
      </Button>
    </Li>
  );
};

LinkItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  id: PropTypes.number,
};

LinkItem.defaultProps = {
  selected: false,
  id: 0,
};


export default LinkItem;
