import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Hero = styled.div`
  position: fixed;
  left:0;
  right:0;
  z-index:9;
  @media (max-width: 767px) {
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-top: 57px !important;
  }

  @media (min-width: 768px) {
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-top: 126px !important;
  }
`;

const ContainerFluid = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
`;

const HeroContainer = (props) => {
  const { children } = props;
  return (
    <Hero className="is-hidden-desktop">
      <ContainerFluid>
        {children}
      </ContainerFluid>
    </Hero>
  );
};

HeroContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default HeroContainer;
