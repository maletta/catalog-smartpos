import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.div`
  padding: 0.5em 0.75em;
`;

const GenericItem = (props) => {
  const { children } = props;
  return (
    <li>
      <Item>
        {children}
      </Item>
    </li>
  );
};

GenericItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


export default GenericItem;
