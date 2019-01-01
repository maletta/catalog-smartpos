import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../navbar/NavBar';
import Logo from '../logo/Logo';

class Header extends Component {
  render() {
    const { logo } = this.props;
    return (
      <NavBar>
        <Logo logo={logo} />
      </NavBar>
    );
  }
}


Header.propTypes = {
  logo: PropTypes.string,
};

Header.defaultProps = {
  logo: '',
};

export default Header;
