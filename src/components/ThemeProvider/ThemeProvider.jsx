import React, { useState, createContext } from 'react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import PropTypes from 'prop-types';


const ThemeContext = createContext();


const ThemeProvider = ({ children, theme }) => {
  const [currentTheme, setTheme] = useState(
    theme || {
      colorHeader: '#00529B',
      colorPrimary: '#F37C05',
      colorLink: '#F38A00',
      colorPrimaryLight: '#ffc67c',
      colorGrayLight: '#efefef',
      colorGrayLight1: '#d7d7d7',
      colorgraylight2: '#918f8f',
      colorWhite: '#FFF',
      buttonPrimary: '#F38A00',
      colorSecondary: '#F38A00',
    },
  );


  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <ThemeProviderStyledComponents theme={theme}>
        {children}
      </ThemeProviderStyledComponents>
    </ThemeContext.Provider>
  );
};

ThemeProvider.defaultProps = {
  theme: {},
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default ThemeProvider;
