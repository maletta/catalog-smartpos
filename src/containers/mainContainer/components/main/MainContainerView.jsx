import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Main = styled.main`
  position:absolute;

  @media (max-width: 767px) {
    margin-left: 15px !important;
    margin-right: 15px !important;
    margin-top: 116px !important;
  }

  @media (min-width: 768px) and (max-width: 1088px) {
    margin-left: 25px !important;
    margin-right: 25px !important;
    margin-top: 190px !important;
  }

  @media (min-width: 1088px) {
    margin-left: 50px !important;
    margin-right: 50px !important;
    margin-top: 150px !important;
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
