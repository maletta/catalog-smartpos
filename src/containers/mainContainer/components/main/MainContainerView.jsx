import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Main = styled.section`
  position: absolute;

  @media (max-width: 768px) {
    margin-top: 57px !important;
  }

  @media (min-width: 769px) and (max-width: 1088px) {
    margin-top: 126px !important;
  }

  @media (min-width: 1088px) {
    margin-top: 126px !important;
  }
`;

const MainContainerView = (props) => {
  const { children } = props;
  return (
    <Main className="main-content columns is-fullheight">
      {children}
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
