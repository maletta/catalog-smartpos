import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FooterContact from 'components/FooterContact';
import PropTypes from 'prop-types';

const FullWidthFooter = styled.div`
  position: relative;
  background-color: #f37c05;
  width: 100%;
  color: #fff;
`;

const FullWidthFooterDownload = styled.div`
  background-color: #fff;
  width: 100%;
  color: #3a3a3a;
  padding: 1.5rem 1.5rem !important;
`;

const FullWidthFooterInfo = styled.div`
  background-color: #fff;
  width: 100%;
  color: #3a3a3a;
  border-bottom: solid 1px #b1b1b1;
`;

const FooterInfoTitle = styled.h5`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const AddressInfo = styled.h6`
  font-size: 0.9rem;
`;

const FullWidthCopyright = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 1.2rem 1.2rem !important;
  border-top: solid 1px #b1b1b1;
`;

const FooterCopyright = styled.span`
  color: #3a3a3a;
  text-align: center;
  font-size: 0.8rem;
`;

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const LinkSocial = styled.a`
  color: #3a3a3a;

  :hover {
    color: #f38a00;
  }
`;

const ButtonDownload = styled.a`
  color: #022751 !important;
  border-color: #022751 !important;
  font-weight: bold;
  padding: 20px 25px !important;
`;

const FixedButton = styled.div`
  position: fixed;
  bottom: 15px;
  right: 20px;
`;

const ButtonWhatsApp = styled.div`
  color: #022751;
  padding: 10px;
  border-radius: 50%;
  background: transparent;
  height: 50px;
  width: 50px;
  border: solid 1px #022751;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Footer = ({ storeInfo }) => (
  <>
    <FullWidthFooter className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-12">
            <FooterContact storeInfo={storeInfo} />
          </div>
        </div>
      </div>
    </FullWidthFooter>
    <FullWidthFooterInfo className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10">
            <FooterInfoTitle>Endereço</FooterInfoTitle>
            <AddressInfo>{storeInfo.fantasia || ''}</AddressInfo>
            <AddressInfo>{`${storeInfo.tipoLogradouro || ''} ${storeInfo.endereco || ''}`}</AddressInfo>
            <AddressInfo>
              {storeInfo.numero && (`Número ${storeInfo.numero}`)}
              {(storeInfo.complemento || '') && ` - ${storeInfo.complemento || ''}`}
            </AddressInfo>
            <AddressInfo>{`${storeInfo.cidade || ''} ${storeInfo.uf && ` - ${storeInfo.uf}`}`}</AddressInfo>
            <AddressInfo>{storeInfo.cep && `CEP: ${storeInfo.cep}`}</AddressInfo>
          </div>
          <div className="column is-2">
            <FooterInfoTitle>Redes sociais</FooterInfoTitle>
            <ul>
              {storeInfo.facebook && (
              <li>
                <LinkSocial
                  href={`https://www.facebook.com/${storeInfo.facebook}`}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  Facebook
                </LinkSocial>
              </li>
              )}
              {storeInfo.instagram && (
                <li>
                  <LinkSocial
                    href={`https://www.instagram.com/${storeInfo.instagram}`}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    Instagram
                  </LinkSocial>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </FullWidthFooterInfo>
    <FullWidthFooterDownload className="section">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-9-desktop is-8-tablet">
            <strong>Baixe o SmartPOS App! </strong>
              Automação comercial inteligente
          </div>
          <div className="column is-3">
            <ButtonDownload
              href="https://play.google.com/store/apps/details?id=br.com.netpos.smartpos"
              rel="noopener noreferrer"
              target="_blank"
              className="button is-outlined"
            >
              <Icon>
                <FontAwesomeIcon icon={['fab', 'google-play']} color="#022751" size="1x" />
              </Icon>
              <span>Baixar na Play Store</span>
            </ButtonDownload>
          </div>
        </div>
      </div>
    </FullWidthFooterDownload>
    <FullWidthCopyright className="section">
      <div className="columns is-centered">
        <div className="column is-12 is-12-mobile has-text-centered">
          <FooterCopyright>
            <span>Todos os direitos reservados - Built with love by SmartPOS </span>
            <FontAwesomeIcon icon={['far', 'heart']} color="red" size="sm" />
          </FooterCopyright>
        </div>
      </div>
    </FullWidthCopyright>
    {storeInfo.whatsapp && (
      <FixedButton>
        <a
          href={`https://api.whatsapp.com/send?phone=55${storeInfo.whatsapp}`}
          rel="noopener noreferrer"
          target="_blank"
          title="Iniciar conversa pelo WhatsApp"
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
