import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FullWidthFooter = styled.div`
  background-color: #f37c05;
  width: 100%;
  color: #fff;
`;

const FullWidthFooterDownload = styled.div`
  background-color: #fff;
  width: 100%;
  color: #3A3A3A;
`;

const FullWidthFooterInfo = styled.div`
  background-color: #fff;
  width: 100%;
  color: #3A3A3A;
  border-bottom: solid 1px #666;
`;

const FooterInfoTitle = styled.h6`
  font-weight: bold;
`;

const FullWidthCopyright = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 1.5rem 1.5rem !important;
  border-top: solid 1px #666;
`;

const FooterCopyrightDiv = styled.div`

`;

const FooterCopyright = styled.span`
  color: #3A3A3A;
  text-align: center;
  font-size: 0.8rem;
`;

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const ButtonDownload = styled.a`
  color: #022751 !important;
  border-color: #022751 !important;
  font-weight: bold;
`;


const Footer = ({ storeInfo }) => {

  return (
    <>
    <FullWidthFooter className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-12">
            Esta com dúvidas? entre em contato com o vendedor!
          </div>
        </div>
      </div>
    </FullWidthFooter>
      <FullWidthFooterInfo className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <FooterInfoTitle>Endereço</FooterInfoTitle>
              <div>{storeInfo.fantasia || ''}</div>
              <div>{`${storeInfo.tipoLogradouro || ''} ${storeInfo.endereco || ''}`}</div>
              <div>
                {storeInfo.numero && (`Número ${storeInfo.numero}`)}
                {(storeInfo.complemento || '') && ` - ${storeInfo.complemento || ''}`}
              </div>
              <div>{storeInfo.numero && (storeInfo.numero || '' / storeInfo.uf || '' - storeInfo.cep || '')}</div>
            </div>
          </div>
        </div>
      </FullWidthFooterInfo>
      <FullWidthFooterDownload className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-9">
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
        <FooterCopyrightDiv className="columns is-centered">
          <div className="column is-12 is-12-mobile has-text-centered">
            <FooterCopyright>
              <span>Todos os direitos reservados - Built with love by SmartPOS </span>
              <FontAwesomeIcon icon={['far', 'heart']} color="red" size="sm" />
            </FooterCopyright>
          </div>
        </FooterCopyrightDiv>
      </FullWidthCopyright>
    </>
  );
};

export default Footer;
