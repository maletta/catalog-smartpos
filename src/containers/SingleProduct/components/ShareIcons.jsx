import React from 'react';
import styled from 'styled-components';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';

const SocialIcon = styled.i`
  font-size: 2rem;
  color: #00529b;
  cursor: pointer;
`;

const ShareIcons = () => {
  const completeURL = window.location.href;

  return (
    <div style={{ width: '50%' }} className="d-flex justify-content-between">
      <FacebookShareButton url={completeURL}>
        <SocialIcon className="fab fa-facebook-square" />
      </FacebookShareButton>
      <TwitterShareButton url={completeURL}>
        <SocialIcon className="fab fa-twitter-square" />
      </TwitterShareButton>
      <WhatsappShareButton url={completeURL}>
        <SocialIcon className="fab fa-whatsapp-square" />
      </WhatsappShareButton>
      <EmailShareButton url={completeURL}>
        <SocialIcon className="fas fa-envelope-square" />
      </EmailShareButton>
    </div>
  );
};

export default ShareIcons;
