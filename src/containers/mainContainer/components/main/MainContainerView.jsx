import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Main = styled.div`
  @media (max-width: 768px) {
    margin-top: 10px !important;
  }
`;

const MainContainerView = (props) => {
  const { children } = props;
  return (
    <Main className="columns">
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
