import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const H5 = styled.h5`
  display: inline-block;
  font-size: 1.1rem;

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const SubTitle = props => <H5>{props.title}</H5>;

SubTitle.propTypes = {
  title: PropTypes.node.isRequired,
};

export default SubTitle;
