import React, { useState, createContext } from 'react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import smartposTheme from 'styles/smartposTheme';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(smartposTheme);

  const updateTheme = newTheme => setTheme(prevTheme => ({ ...prevTheme, ...newTheme }));
  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <ThemeProviderStyledComponents theme={{ ...theme }}>
        {children}
      </ThemeProviderStyledComponents>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;