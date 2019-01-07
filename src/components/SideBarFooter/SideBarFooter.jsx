import React, { Component } from 'react';
import styled from 'styled-components';
import { List, GenericItem, ItemText } from 'components/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = styled.div`
  padding-top: 25px;
`;

const Icon = styled.span`
  min-width: 20px;
  display: inline-block;
`;

class SideBarFooter extends Component {
  render() {
    return (
      <Footer>
        <List>
          <GenericItem>
            <Icon>
              <FontAwesomeIcon icon="map-marker-alt" color="#6DB65B" size="sm" />
            </Icon>
            <span>Rua Ézio Wagner da Silva, 114 Ap 33 Bl 01 - Campinas/SP - 13060-367</span>
          </GenericItem>
          <ItemText text="(19) 982337651" iconName={['fab', 'whatsapp']} iconColor="#6DB65B" />
          <ItemText text="daniel@netpos.com.br" iconName="envelope" iconColor="#6DB65B" />
          <ItemText text="/danielfelgar" iconName={['fab', 'facebook-f']} iconColor="#6DB65B" />
          <ItemText text="@danielfelgar" iconName={['fab', 'instagram']} iconColor="#6DB65B" />
        </List>
      </Footer>
    );
  }
}

SideBarFooter.propTypes = {
};

SideBarFooter.defaultProps = {
};


export default SideBarFooter;
