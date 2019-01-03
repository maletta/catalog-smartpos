import React, { Component } from 'react';
import GridList from 'components/GridList';
import DropDown from 'components/DropDown';
import HeroContainer from 'components/heroContainer';
import Header from 'containers/header';
import MainContainer from 'containers/mainContainer';
import itens from 'produtos';
import categorias from 'categorias';

class App extends Component {
  render() {
    return (
      <>
        <Header logo="https://lh3.googleusercontent.com/YPwFZ4FHxrKgvgvCgeZPCmfRSPsSwvBsB_9DvXtxcuaYax2cRemjR3mrZbqB4Qq41j4" />
        <HeroContainer>
          <DropDown title="Titulo" list={categorias} />
        </HeroContainer>
        <MainContainer>
          <GridList itens={itens} />
        </MainContainer>
      </>
    );
  }
}

export default App;
