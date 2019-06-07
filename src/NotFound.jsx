import React from 'react';
import styled from 'styled-components';
import store from 'assets/online-store.png';

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.75rem;
  padding-bottom: 150px;

  @media (max-width: 720px) {
    font-size: 1.75rem;
  }
`;

const NotFound = () => (
  <>
    <div className="">
      <Image>
        <img src={store} alt="store" width="300px" />
      </Image>
      <Text>
        <span> Loja não encontrada.</span>
      </Text>
      <footer>
        <div className="content has-text-centered">
          <p>
            <strong>SmartPOS</strong>
          </p>
        </div>
      </footer>
    </div>
  </>

);


export default NotFound;
