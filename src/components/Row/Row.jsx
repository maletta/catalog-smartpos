import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Row = ({ className, children }) => (
  <div className={classNames('row', className)}>
    {children}
  </div>
);

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Row.defaultProps = {
  className: '',
  children: null,
};

export default Row;
