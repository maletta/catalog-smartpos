import React from 'react';
import styled from 'styled-components';

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
`;

const NotFound = () => (
  <>
    <div className="">
      <Image>
        <img src="https://img.icons8.com/cotton/420/online-store.png" alt="store" width="300px" />
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
