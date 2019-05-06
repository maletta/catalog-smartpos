import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../navbar/NavBar';
import Logo from '../logo/Logo';

const Header = (props) => {
  const { logo } = props;
  return (
    <NavBar>
      <Logo logo={logo} />
    </NavBar>
  );
};


Header.propTypes = {
  logo: PropTypes.string,
};

Header.defaultProps = {
  logo: '',
};

export default Header;
