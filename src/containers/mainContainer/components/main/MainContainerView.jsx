import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Main = styled.main`
  transition: margin-left 0.3s;

  @media (max-width: 767px) {
    margin-left: 15px !important;
    margin-right: 15px !important;
    margin-top: 85px !important;
  }

  @media (min-width: 768px) {
    margin-left: 50px !important;
    margin-right: 50px !important;
    margin-top: 160px !important;
  }
`;

const ContainerFluid = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
`;

const MainContainerView = (props) => {
  const { children } = props;
  return (
    <Main>
      <ContainerFluid>
        {children}
      </ContainerFluid>
    </Main>
  );
};

MainContainerView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainContainerView;
