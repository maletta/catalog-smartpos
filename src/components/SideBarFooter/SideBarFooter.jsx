import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  List, GenericItem,
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
    </List>
  </Footer>
);

SideBarFooter.propTypes = {
};

SideBarFooter.defaultProps = {
};


export default SideBarFooter;
