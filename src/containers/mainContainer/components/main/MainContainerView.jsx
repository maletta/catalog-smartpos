import React from 'react';
import PropTypes from 'prop-types';

const MainContainerView = (props) => {
  const { children } = props;
  return (
    <>
      {children}
    </>
  );
};

MainContainerView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainContainerView;
