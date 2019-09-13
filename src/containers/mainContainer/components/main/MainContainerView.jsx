import React from 'react';
import PropTypes from 'prop-types';

const MainContainerView = (props) => {
  const { children } = props;
  return (
    <div className="container">
      {children}
    </div>
  );
};

MainContainerView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainContainerView;
