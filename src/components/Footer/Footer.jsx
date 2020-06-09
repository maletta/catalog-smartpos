import React from 'react';
import styled from 'styled-components';
import lodash from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Row from 'components/Row';
import Grid from 'components/Grid';
import FooterContact from 'components/FooterContact';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import daysOfWeek from 'utils/daysOfWeek';
import CardCredit from '../../assets/Imagem 73@2x.png';


const FullWidthCopyright = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 1.2rem 1.2rem !important;
  border-top: solid 1px #b1b1b1;
`;

const FooterCopyright = styled.div`
  color: #3a3a3a;
  text-align: center;
  font-size: 0.8rem;
`;

const LinkNetPOS = styled.a`
  color: #00529b;
  text-decoration: none;
  font-weight: 600;
  margin: 5px 5px;

  :hover {
    color: var(--color-primary);
    text-decoration: none;
  }
`;

const CardCreditImg = styled.img`
  margin-right: -30px;
  width: 280px;
  height: 120px;

  @media (max-width: 1023px) {
    width: 240px;
  }

  @media (max-width: 414px) {
    margin-right: 1px;
    width: 320px;
  }

  @media (max-width: 330px) {
    width: 300px;
  }
`;
const FullWidthFooter = styled.div`
  position: relative;
  background-color: var(--color-secundary);
  width: 100%;
  color: #fff;
`;

const FullWidthFooterDownload = styled.div`
  background-color: #fff;
  width: 100%;
  color: #3a3a3a;
`;

const FullWidthFooterInfo = styled.div`
  background-color: #fff;
  width: 100%;
  color: #3a3a3a;
  border-bottom: solid 1px #b1b1b1;
  padding-bottom: 50px;
`;

const FooterInfoTitle = styled.h5`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const AddressInfo = styled.h6`
  font-size: 0.9rem;
`;

const OpenHourItem = styled(Grid)`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: ${props => (props.currentDay ? '700' : '400')};
`;

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const LinkSocial = styled.a`
  color: #3a3a3a;

  :hover {
    color: var(--color-link);
  }
`;

const ButtonDownload = styled.a`
  color: #022751 !important;
  border: 2px solid #022751 !important;
  font-weight: bold;
`;

const FixedButton = styled.div`
  position: fixed;
  bottom: 15px;
  right: 20px;
`;

const ButtonWhatsApp = styled.div`
  color: #019444;
  padding: 10px;
  border-radius: 50%;
  background: #fff;
  height: 50px;
  width: 50px;
  border: solid 1px #019444;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialIcon = styled.span`
  min-width: 20px;
  display: inline-block;
`;
const GridHour = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  padding-right: 1px;
`;
const GridTitle = styled(Grid)`
  display: flex;
  justify-content: center;
`;
const GridDayOfWeek = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;

const GridItemHour = styled(Grid)`
  padding-right: 0;
  padding-left: 0;
`;

const GridInfo = styled(Grid)`
  @media (max-width: 430px) {
    margin-left: 15%;
  }
`;

const Footer = ({ storeInfo }) => {
  let openHours = (storeInfo.openHours || []);
  openHours = openHours.map(day => ({
    ...day,
    ...daysOfWeek[lodash.findKey(daysOfWeek, { name: day.dayOfWeek })],
  }));

  const getIntOfDay = new Date().getDay();
  const keyIndex = indexHour => `key${indexHour}`;

  return (
    <>
      <FullWidthFooter>
        <div className="container">
          <Row className="columns pt-4 pb-5">
            <Grid cols="12" className="d-flex align-items-center">
              <FooterContact storeInfo={storeInfo} />
            </Grid>
          </Row>
        </div>
      </FullWidthFooter>
      <FullWidthFooterInfo>
        <div style={{ position: 'relative', top: '40px' }} className="container">
          <Row>
            <GridInfo
              cols="10 10 2 2 2"
              className="pb-5"
            >
              <FooterInfoTitle>Endereço</FooterInfoTitle>
              <AddressInfo>{storeInfo.fantasia || ''}</AddressInfo>
              <AddressInfo>{`${storeInfo.tipoLogradouro || ''} ${storeInfo.endereco || ''}`}</AddressInfo>
              <AddressInfo>
                {storeInfo.numero && (`Número ${storeInfo.numero}`)}
                {(storeInfo.complemento || '') && ` - ${storeInfo.complemento || ''}`}
              </AddressInfo>
              <AddressInfo>{`${storeInfo.cidade || ''} ${(storeInfo.uf ? ` - ${storeInfo.uf}` : '')}`}</AddressInfo>
              <AddressInfo>{storeInfo.cep && `CEP: ${storeInfo.cep}`}</AddressInfo>
              <br />
              <br />
              <div>
                {(storeInfo.facebook || storeInfo.instagram) && (
                  <FooterInfoTitle>Redes sociais</FooterInfoTitle>
                )}
                <ul>
                  {storeInfo.facebook && (
                    <li>
                      <LinkSocial
                        href={`https://www.facebook.com/${storeInfo.facebook}`}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        onClick={() => {
                          ReactGA.event({
                            category: 'FOOTER',
                            action: 'CLICK_FACEBOOK',
                            label: storeInfo.usuario,
                          });
                        }}
                      >
                        <SocialIcon>
                          <FontAwesomeIcon icon={['fab', 'facebook-f']} color="#3a3a3a" size="1x" />
                        </SocialIcon>
                        {storeInfo.facebook}
                      </LinkSocial>
                    </li>
                  )}
                  {storeInfo.instagram && (
                    <li>
                      <LinkSocial
                        href={`https://www.instagram.com/${storeInfo.instagram}`}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        onClick={() => {
                          ReactGA.event({
                            category: 'FOOTER',
                            action: 'CLICK_INSTAGRAM',
                            label: storeInfo.usuario,
                          });
                        }}
                      >
                        <SocialIcon>
                          <FontAwesomeIcon icon={['fab', 'instagram']} color="#3a3a3a" size="1x" />
                        </SocialIcon>
                        {storeInfo.instagram}
                      </LinkSocial>
                    </li>
                  )}
                </ul>
              </div>
            </GridInfo>
            <Grid
              cols="12 9 6 6 7"
              className="pb-5"
            >
              {(openHours.length > 0) && (
                <>
                  <Grid cols="12">
                    <GridTitle cols="12" style={{ justifyContent: 'center' }}>
                      <FooterInfoTitle>Horário de funcionamento</FooterInfoTitle>
                    </GridTitle>
                    {openHours.map(day => (
                      <OpenHourItem
                        currentDay={getIntOfDay === day.position}
                        cols="12 12"
                        key={day.name}
                      >
                        <GridDayOfWeek style={{ paddingLeft: '0px' }}>
                          {day.dayOfWeek}
                        </GridDayOfWeek>
                        <GridHour style={{ paddingRight: 'unset', paddingLeft: 'unset' }}>
                          {day.hours.map((itemHour, indexHour) => (
                            <GridItemHour key={keyIndex(indexHour)} className="ml-0">
                              {(day.closed ? 'Fechado' : `${itemHour.openHour} às ${itemHour.closeHour}`)}
                            </GridItemHour>
                          ))}
                        </GridHour>
                      </OpenHourItem>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
            <Grid
              className="d-flex justify-content-md-end"
              style={{ justifyContent: 'center' }}
            >
              <CardCreditImg src={CardCredit} alt="bandeiras" />
            </Grid>
          </Row>
        </div>
      </FullWidthFooterInfo>
      <FullWidthFooterDownload>
        <div className="container">
          <Row className="pt-3 pb-3">
            <Grid cols="12 7 8 8 8" className="d-flex align-items-center">
              <div className="mb-3 mb-sm-0">
                <strong>Baixe o SmartPOS App! </strong>
                <span>Automação comercial inteligente</span>
              </div>
            </Grid>
            <Grid cols="12 5 4 4 4" className="d-flex justify-content-xl-end">
              <div>
                <ButtonDownload
                  href="https://play.google.com/store/apps/details?id=br.com.netpos.smartpos"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn"
                  onClick={() => {
                    ReactGA.event({
                      category: 'FOOTER',
                      action: 'CLICK_SMARTPOS_PLAYSTORE',
                      label: storeInfo.usuario,
                    });
                  }}
                >
                  <Icon>
                    <FontAwesomeIcon icon={['fab', 'google-play']} color="#022751" size="1x" />
                  </Icon>
                  <span>Baixar na Play Store</span>
                </ButtonDownload>
              </div>
            </Grid>
          </Row>
        </div>
      </FullWidthFooterDownload>
      <FullWidthCopyright>
        <div className="container">
          <Row>
            <Grid cols="12">
              <FooterCopyright>
                <span>
                  {'Todos os direitos reservados - Built with love by'}
                  <LinkNetPOS
                    href="https://www.smartpos.net.br"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="SmartPOS"
                  >
                    {'SmartPOS'}
                  </LinkNetPOS>
                </span>
                <FontAwesomeIcon icon={['far', 'heart']} color="red" size="sm" />
              </FooterCopyright>
            </Grid>
          </Row>
        </div>
      </FullWidthCopyright>
      {(storeInfo.is_enableOrder === 0 && storeInfo.whatsapp) && (
        <FixedButton>
          <a
            href={`https://api.whatsapp.com/send?phone=55${storeInfo.whatsapp}`}
            rel="noopener noreferrer"
            target="_blank"
            title="Iniciar conversa pelo WhatsApp"
            onClick={() => {
              ReactGA.event({
                category: 'FOOTER',
                action: 'CLICK_FLOAT_WHATS',
                label: storeInfo.usuario,
              });
            }}
          >
            <ButtonWhatsApp>
              <FontAwesomeIcon icon={['fab', 'whatsapp']} />
            </ButtonWhatsApp>
          </a>
        </FixedButton>
      )}
    </>
  );
};

Footer.propTypes = {
  storeInfo: PropTypes.object.isRequired,
};

Footer.defaultProps = {};

export default Footer;
