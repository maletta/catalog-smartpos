import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FullWidthFooter = styled.div`
  background-color: #0c458e;
  width: 100%;
`;

const Columns = styled.div`
  background-color: #0c458e;
  color: white;
`;

const Column = styled.div`
  height: auto;
  color: white;
`;

const Sociais = styled.a`
  color: #fff;

  :hover {
    color: #fff;
  }
`;

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const FixedButton = styled.div`
  position: fixed;
  bottom: 15px;
  right: 20px;
`;

const ButtonWhatsApp = styled.div`
  color: #f38a00;
  padding: 10px;
  border-radius: 50%;
  background: #fff;
  height: 60px;
  width: 60px;
  border: solid 1px #f38a00;
  font-size: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullWidthCopyright = styled.div`
  background-color: #002352;
  width: 100%;
  padding: 1.5rem 1.5rem !important;
`;

const FooterCopyrightDiv = styled.div`
  background-color: #002352;
`;

const FooterCopyright = styled.span`
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
`;

const Footer = ({ storeInfo }) => (
  <>
    <FullWidthFooter className="section">
      <div className="container">
        <Columns className="columns is-centered">
          <Column className="column is-12-mobile is-6-tablet is-4-desktop">
            <div>{storeInfo.fantasia || ''}</div>
            <div>{`${storeInfo.tipoLogradouro || ''} ${storeInfo.endereco || ''}`}</div>
            <div>
              {storeInfo.numero && (`Número ${storeInfo.numero}`)}
              {(storeInfo.complemento || '') && `- ${storeInfo.complemento || ''}`}
            </div>
            <div>{storeInfo.numero && (storeInfo.numero || '' / storeInfo.uf || '' - storeInfo.cep || '')}</div>
          </Column>
          <Column className="column is-4-desktop">
            <ul>
              {storeInfo.whatsapp && (
              <li>
                <Icon>
                  <FontAwesomeIcon icon={['fab', 'whatsapp']} color="white" size="sm" />
                </Icon>
                <span>{storeInfo.whatsapp || ''}</span>
              </li>
              )}
              <li>
                <Sociais href={`mailto:${storeInfo.email || ''}`}>
                  <Icon>
                    <FontAwesomeIcon icon="envelope" color="white" size="sm" />
                  </Icon>
                  <span>{storeInfo.email || ''}</span>
                </Sociais>
              </li>
            </ul>
          </Column>
          <Column className="column is-12-mobile is-4-desktop">
            <ul>
              {storeInfo.facebook && (
                <li>
                  <Sociais
                    href={`https://www.facebook.com/${storeInfo.facebook}`}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    <Icon>
                      <FontAwesomeIcon icon={['fab', 'facebook-f']} color="white" size="sm" />
                    </Icon>
                    <span>/facebook</span>
                  </Sociais>
                </li>
              )}
              {storeInfo.instagram && (
                <li>
                  <Sociais
                    href={`https://www.instagram.com/${storeInfo.instagram}`}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    <Icon>
                      <FontAwesomeIcon icon={['fab', 'instagram']} color="white" size="sm" />
                    </Icon>
                    <span>/instagram</span>
                  </Sociais>
                </li>
              )}
            </ul>
          </Column>
        </Columns>
      </div>
    </FullWidthFooter>
    <FullWidthCopyright className="section">
      <FooterCopyrightDiv className="columns is-centered">
        <div className="column is-3 is-12-mobile has-text-centered">
          <FooterCopyright>
            <span> built with love by SmartPOS </span>
            <FontAwesomeIcon icon={['far', 'heart']} color="red" size="sm" />
          </FooterCopyright>
        </div>
      </FooterCopyrightDiv>
    </FullWidthCopyright>
    {storeInfo.whatsapp && (
      <FixedButton>
        <a
          href={`https://api.whatsapp.com/send?phone=55${storeInfo.whatsapp}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ButtonWhatsApp>
            <FontAwesomeIcon icon={['fab', 'whatsapp']} />
          </ButtonWhatsApp>
        </a>
      </FixedButton>
    )}
  </>
);

Footer.propTypes = {
  storeInfo: PropTypes.object.isRequired,
};

Footer.defaultProps = {};

export default Footer;
