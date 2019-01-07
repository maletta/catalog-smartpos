import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  render() {
    const { children, title } = this.props;
    return (
      <>
        {title ? (<p className="menu-label is-hidden-touch">{title}</p>) : (<></>)}
        <ul className="menu-list">
          {children}
        </ul>
      </>
    );
  }
}

List.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

List.defaultProps = {
  title: undefined,
};


export default List;
