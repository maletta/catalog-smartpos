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
    complemento,
    observacao,
  } = props;
  const msg = `
✅ *PEDIDO ENVIADO*${'%0A'}${'%0A'}
▶ *RESUMO DO PEDIDO*${'%0A'}${'%0A'}
*Pedido:* ${orderId}${'%0A'}${'%0A'}
${cart.map(item => (
    `*${item.quantity}x* _${item.descricao}_ *(${formatCurrency(item.pricing.product)})*${'%0A'}`
  ))}${'%0A'}
*Subtotal da compra:* ${formatCurrency(subTotal)}${'%0A'}
${couponValue > 0 ? (`*Cupom de desconto:* ${formatCurrency(couponValue)}${'%0A'}`) : ''}
${deliveryCost > 0 ? (`*Taxa de Entrega:* ${formatCurrency(deliveryCost)}${'%0A'}`) : ''}
${change > 0 ? (`*Troco:* ${formatCurrency(change)} ${'%0A'}`) : ''}
${observacao ? (`*Observação:* ${observacao} ${'%0A'}`) : ''}${'%0A'}
▶ *DADOS PARA ENTREGA*${'%0A'}
*Nome:* ${name}${'%0A'}
*Endereço:* ${endereco} n°${numero}${'%0A'}
*Bairro:* ${bairro}${'%0A'}
${complemento ? (`*Complemento:* ${complemento}${'%0A'}`) : ''}
*WhatsApp:* ${phone}${'%0A'}${'%0A'}
▶ *TOTAL = ${formatCurrency(total)}*${'%0A'}${'%0A'}
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
  complemento: PropTypes.any.isRequired,
  observacao: PropTypes.string.isRequired,
};

export default WhatsappLink;
