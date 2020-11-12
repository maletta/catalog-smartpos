import 'icons';
import 'styles/react-select-dropwdown.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';

import GlobalProvider from 'contexts/GlobalContext';
import { FilterProvider } from 'contexts/FilterContext';
import { ShopProvider } from 'contexts/ShopContext';
import { ShoppingCartProvider } from 'contexts/ShoppingCartContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import AppWrapper from 'containers/AppWrapper';


// import dynamicManifest from 'dynamicManifest';
// import initGA from 'initGA';
// import AppRouter from 'Router';
// import history from 'utils/history';

import GlobalStyles from 'styles/Global';

const If = ({ children, condition }) => (condition ? children : null);

const ContextWrapper = ({ children }) => (
  <If condition={typeof window === 'object'}>
    <GlobalProvider>
      <ThemeProvider>
        <ShopProvider>
          <FilterProvider>
            <ShoppingCartProvider>
              <GlobalStyles />
              {/* {dynamicManifest()} */}
              <AppWrapper>
                {children}
              </AppWrapper>
            </ShoppingCartProvider>
          </FilterProvider>
        </ShopProvider>
      </ThemeProvider>
    </GlobalProvider>
  </If>
);

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ContextWrapper>
        <Component {...pageProps} />
      </ContextWrapper>
    );
  }
}


ContextWrapper.defaultProps = {
  children: '',
};

ContextWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
