import React, { useReducer, createContext } from 'react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import smartposTheme from 'styles/smartposTheme';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'THEME':
        return { ...state, ...action.payload };
      default:
        return { ...state };
    }
  };

  const [theme, dispatchTheme] = useReducer(reducer, smartposTheme);

  return (
    <ThemeContext.Provider value={{
      theme, dispatchTheme,
    }}
    >
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
