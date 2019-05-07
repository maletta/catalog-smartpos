import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin-top: 5px;
  background-color: #e88600;
  padding-top: 5px;
  color: white;
`;

const Row = styled.div` 
  padding: 30px;
  height: auto;
  color: white;
`;

const Li = styled.li`
  margin-right: 50px;
  margin-left: 50px;
`;

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;


const Footer = () => (
  <>
    <Container>
      <Row>
        <Icon>
          <FontAwesomeIcon icon="map-marker-alt" color="white" size="sm" />
        </Icon>
        <span>Rua Ézio Wagner da Silva, 114 Ap 33 Bl 01 - Campinas/SP - 13060-367</span>
      </Row>
      <Row>
        <ul>
          <Li>
            <Icon>
              <FontAwesomeIcon icon={['fab', 'whatsapp']} color="white" size="sm" />
            </Icon>
            <span> (19) 9991209 </span>
          </Li>
          <Li>
            <Icon>
              <FontAwesomeIcon icon="envelope" color="white" size="sm" />
            </Icon>
            <span>comercial@smartpos.net.br</span>
          </Li>
        </ul>
      </Row>
      <Row>
        <ul>
          <Li>
            <Icon>
              <FontAwesomeIcon icon={['fab', 'facebook-f']} color="white" size="sm" />
            </Icon>
            <span> /facebook</span>
          </Li>
          <Li>
            <Icon>
              <FontAwesomeIcon icon={['fab', 'instagram']} color="white" size="sm" />
            </Icon>
            <span> /instagram</span>
          </Li>
        </ul>
      </Row>
    </Container>
  </>
);


Footer.propTypes = {
};

Footer.defaultProps = {
};

export default Footer;
