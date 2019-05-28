import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Button = styled.a`
  position: relative;
  align-items: center;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  color: #3a3a3a;
  background-color: #fff;
  text-align: left;
  padding: 2px 25px 2px 15px;
  height: auto;
  width: 100%;
  justify-content: flex-start;
`;

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
  margin-right: 15px;
  font-size: 34px;
`;

const Title = styled.span`
  display: block;
  font-size: 14px;
`;

const AreaContent = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
  }
`;

const AreaButton = styled.div`
  width: auto;
  margin-top: 15px;
  padding-bottom: 15px;
`;

const FooterContact = ({ storeInfo }) => (
  <div>
    <p>Está com dúvidas? Entre em contato com o vendedor!</p>
    <AreaContent>
      <AreaButton>
        <Button
          href={`tel:${storeInfo.whatsapp}`}
          rel="noopener noreferrer nofollow"
        >
          <Icon>
            <FontAwesomeIcon icon={['fas', 'phone']} />
          </Icon>
          <div>
            <Title>Telefone</Title>
            <Title>{storeInfo.whatsapp}</Title>
          </div>
        </Button>
      </AreaButton>
      <AreaButton>
        <Button
          href={`mailto:${storeInfo.email || ''}`}
          rel="noopener noreferrer nofollow"
        >
          <Icon>
            <FontAwesomeIcon icon={['fas', 'envelope']} />
          </Icon>
          <div>
            <Title>E-mail</Title>
            <Title>{storeInfo.email}</Title>
          </div>
        </Button>
      </AreaButton>
      {storeInfo.whatsapp && (
      <AreaButton>
        <Button
          href={`https://api.whatsapp.com/send?phone=55${storeInfo.whatsapp}`}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <Icon>
            <FontAwesomeIcon icon={['fab', 'whatsapp']} />
          </Icon>
          <div>
            <Title>WhatsApp</Title>
            <Title>Iniciar conversa</Title>
          </div>
        </Button>
      </AreaButton>
      )}
    </AreaContent>
  </div>
);

FooterContact.propTypes = {
  storeInfo: PropTypes.object.isRequired,
};

FooterContact.defaultProps = {};

export default FooterContact;
