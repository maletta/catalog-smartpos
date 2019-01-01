import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const NavLogo = styled.a`
  line-height: 0px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0px auto;
  text-align: center;  
`;

const LogoImage = styled.img`
  @media (min-width: 768px) {
    width: 96px;
    height: 96px;
  }
  @media (max-width: 767px) {
    width: 47px;
    height: 47px;
  }
`;

const Logo = (props) => {
  const { logo } = props;
  return (
    <NavLogo>
      <LogoImage src={logo} />
    </NavLogo>
  );
};

Logo.propTypes = {
  logo: PropTypes.string.isRequired,
};

Logo.defaultProps = {
};

export default Logo;
