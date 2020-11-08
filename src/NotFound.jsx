import React from 'react';
import styled from 'styled-components';

const Image = styled.div`
  display: grid;
  place-items: center;
  padding-top: 50px;
`;

const Text = styled.span`
  display: grid;
  place-items: center;
  font-size: 2.75rem;
  padding-bottom: 150px;

  @media (max-width: 720px) {
    font-size: 1.75rem;
  }
`;

const Footer = styled.footer`
  display: grid;
  place-items: center;
  font-weight: bold;
`;

const NotFound = () => (
  <>
    <Image>
      <img src="assets/online-store.png" alt="store" width="300px" />
    </Image>
    <Text>Loja não encontrada.</Text>
    <Footer>SmartPOS</Footer>
  </>
);

export default NotFound;
