import React, { Component } from 'react';
import GridList from 'components/GridList';
import Header from 'containers/header';
import MainContainer from 'containers/mainContainer';
import itens from 'produtos';

class App extends Component {
  render() {
    return (
      <div>
        <Header logo="https://lh3.googleusercontent.com/YPwFZ4FHxrKgvgvCgeZPCmfRSPsSwvBsB_9DvXtxcuaYax2cRemjR3mrZbqB4Qq41j4" />
        <MainContainer>
          <GridList itens={itens} />
        </MainContainer>
      </div>
    );
  }
}

export default App;
