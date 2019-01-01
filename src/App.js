import React, { Component } from 'react';
import 'App.scss';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'styles/DefaultTheme';
import GridList from 'components/GridList';
import itens from 'produtos';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <GridList itens={itens} />
      </ThemeProvider>
    );
  }
}

export default App;
