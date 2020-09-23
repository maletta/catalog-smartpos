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

  const [state, dispatchTheme] = useReducer(reducer, smartposTheme);

  return (
    <ThemeContext.Provider value={{
      state, dispatchTheme,
    }}
    >
      <ThemeProviderStyledComponents theme={{ ...state }}>
        {children}
      </ThemeProviderStyledComponents>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;
