import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.h5`
  margin: 0 0 15px 0;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Separator = styled.div`
  border-bottom: 2px solid var(--color-gray-dark-2);
  width: 30px;
  margin: -5px 0 15px;
`;

const SectionTitle = ({ children, showSeparator }) => (
  <>
    <Title>{children}</Title>
    { showSeparator && (<Separator />)}
  </>
);

SectionTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  showSeparator: PropTypes.bool,
};

SectionTitle.defaultProps = {
  children: '',
  showSeparator: false,
};

export default SectionTitle;
