import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const NavLogo = styled.a`
  line-height: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
`;

const LogoImage = styled.img`
  @media (min-width: 769px) {
    width: 96px;
    height: 96px;
  }

  @media (max-width: 768px) {
    width: 47px;
    height: 47px;
  }
`;

const Logo = (props) => {
  const { codigo, fantasia } = props;
  const imageBaseUrl = `${process.env.REACT_APP_IMG_API}store/${codigo}`;
  return (
    <NavLogo>
      <LogoImage src={imageBaseUrl} title={fantasia} />
    </NavLogo>
  );
};

Logo.propTypes = {
  fantasia: PropTypes.string.isRequired,
  codigo: PropTypes.number.isRequired,
};

Logo.defaultProps = {
};

export default Logo;
