import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatCurrency from '../../../utils/formatCurrency';

const SendWhatsapp = styled.a`
  color: #006195;

  :hover {
    text-decoration: underline #006195;
  }
`;

const WhatsappLink = (props) => {
  const {
    orderId,
    whatsapp,
    subTotal,
    name,
    couponValue,
    endereco,
    numero,
    bairro,
    phone,
    deliveryCost,
    total,
    pagamento,
    change,
    cart,
  } = props;
  const msg = `
✅ *PEDIDO ENVIADO*${'%0D'}${'%0D'}
▶ *RESUMO DO PEDIDO*${'%0D'}${'%0D'}
*Pedido:* ${orderId}${'%0D'}${'%0D'}
${cart.map(item => (
    `*${item.quantity}x* _${item.descricao}_ *(${formatCurrency(item.pricing.product)})*${'%0D'}`
  ))}${'%0D'}
*Subtotal da compra:* ${formatCurrency(subTotal)}${'%0D'}
*Cupom de desconto:* ${couponValue}${'%0D'}
*Taxa de Entrega:* ${formatCurrency(deliveryCost)}${'%0D'}
*Troco:* ${formatCurrency(change)}${'%0D'}${'%0D'}
▶ *DADOS PARA ENTREGA*${'%0D'}
*Nome:* ${name}${'%0D'}
*Endereço:* ${endereco} n°${numero}${'%0D'}
*Bairro:* ${bairro}${'%0D'}
*WhatsApp:* ${phone}${'%0D'}${'%0D'}
▶ *TOTAL = ${formatCurrency(total)}*${'%0D'}${'%0D'}
▶ *PAGAMENTO:* ${pagamento.descricao || 'Cartão de Crédito'}
  `;

  const result = msg.replaceAll(',*', '*');
  const baseURL = 'https://api.whatsapp.com/send?phone=55';
  const linkWhatsApp = `${baseURL}${whatsapp}&text=${result}`;

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
  subTotal: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  endereco: PropTypes.any.isRequired,
  numero: PropTypes.any.isRequired,
  bairro: PropTypes.any.isRequired,
  phone: PropTypes.string.isRequired,
  deliveryCost: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pagamento: PropTypes.any.isRequired,
  change: PropTypes.number.isRequired,
  cart: PropTypes.any.isRequired,
  couponValue: PropTypes.any.isRequired,
};

export default WhatsappLink;
