import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Nav = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  height: 126px;
  padding: 15px 60px;
  position: fixed;
  top: -1px;
  right: 0;
  left: 0;
  z-index: 10;

  @media print {
    display: none;
  }

  @media (max-width: 767px) {
    height: 57px;
    padding: 5px;
    padding-left: 30px;
  }
`;

const NavBarContainer = (props) => {
  const { children } = props;
  return <Nav data-test="navbar-component">{children}</Nav>;
};

NavBarContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

NavBarContainer.defaultProps = {
  children: null,
};

export default NavBarContainer;
