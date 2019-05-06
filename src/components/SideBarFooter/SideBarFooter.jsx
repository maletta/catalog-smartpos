import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  List, GenericItem, ItemLink,
} from 'components/List';

const Footer = styled.div`
  padding-top: 25px;
`;

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

const SideBarFooter = () => (
  <Footer>
    <List>
      <GenericItem>
        <Icon>
          <FontAwesomeIcon icon="map-marker-alt" color="#F38A00" size="sm" />
        </Icon>
        <span>Rua Ézio Wagner da Silva, 114 Ap 33 Bl 01 - Campinas/SP - 13060-367</span>
      </GenericItem>
      <ItemLink
        text="(19) 982337651"
        link="https://api.whatsapp.com/send?phone=551125969670"
        iconName={['fab', 'whatsapp']}
        iconColor="#F38A00"
      />
      <ItemLink
        text="comercial@smartpos.net.br"
        link="mailto:comercial@smartpos.net.br"
        iconName="envelope"
        iconColor="#F38A00"
      />
      <ItemLink
        text="/smartposbr"
        link="https://facebook.com/smartposbr"
        iconName={['fab', 'facebook-f']}
        iconColor="#F38A00"
      />
      <ItemLink
        text="@smartposbr"
        link="https://www.instagram.com/smartposbr/"
        iconName={['fab', 'instagram']}
        iconColor="#F38A00"
      />
    </List>
  </Footer>
);

SideBarFooter.propTypes = {
};

SideBarFooter.defaultProps = {
};


export default SideBarFooter;
