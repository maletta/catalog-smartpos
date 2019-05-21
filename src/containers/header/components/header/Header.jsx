import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../navbar/NavBar';
import Logo from '../logo/Logo';

const Header = (props) => {
  const { storeInfo: { codigo, fantasia } } = props;
  return (
    <NavBar>
      <Logo codigo={codigo} fantasia={fantasia} />
    </NavBar>
  );
};


Header.propTypes = {
  storeInfo: PropTypes.object.isRequired,
};

Header.defaultProps = {

};

export default Header;
