import React, { useState, createContext } from 'react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import defaultTheme from 'styles/defaultTheme';
import PropTypes from 'prop-types';


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

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
