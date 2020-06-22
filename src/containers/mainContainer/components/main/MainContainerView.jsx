import React from 'react';
import PropTypes from 'prop-types';

const MainContainerView = ({ children }) => (
  <>
    {children}
  </>
);

MainContainerView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainContainerView;
