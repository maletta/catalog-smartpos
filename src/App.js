import React, { Component } from 'react';
import GridList from 'components/GridList';
import Header from 'containers/header';
import Footer from 'containers/footer';
import MainContainer from 'containers/mainContainer';
import itens from 'produtos';
import SideBar from 'components/SideBar';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faCheck, faList, faTh, faMapMarkerAlt, faPhone, faEnvelope, faFacebookF,
  faWhatsapp, faInstagram);

class App extends Component {
  render() {
    return (
      <>
        <Header logo="https://lh3.googleusercontent.com/YPwFZ4FHxrKgvgvCgeZPCmfRSPsSwvBsB_9DvXtxcuaYax2cRemjR3mrZbqB4Qq41j4" />
        <MainContainer>
          <SideBar />
          <GridList itens={itens} />
        </MainContainer>
        <Footer />
      </>
    );
  }
}

export default App;
