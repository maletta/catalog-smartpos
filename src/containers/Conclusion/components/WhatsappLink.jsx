import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SendWhatsapp = styled.a`
  color: #006195;

  :hover {
    text-decoration: underline #006195;
  }
`;

const WhatsappLink = (props) => {
  const { orderId, whatsapp } = props;
  const msg = `Você acabou de receber o pedido ${orderId} 
  do seu catálogo on-line SmartPOS, acesse o app ou site e 
  verifique nos pedidos em aberto.
  `;
  const baseURL = 'https://api.whatsapp.com/send?phone=55';
  const linkWhatsApp = `${baseURL}${whatsapp}&text=${encodeURIComponent(msg)}`;

  return (
    <SendWhatsapp
      href={linkWhatsApp}
      target="_blank"
    >

      Enviar confirmação por Whatsapp
    </SendWhatsapp>
  );
};

WhatsappLink.propTypes = {
  orderId: PropTypes.any.isRequired,
  whatsapp: PropTypes.string.isRequired,
};

export default WhatsappLink;
