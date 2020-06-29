import React, { useContext } from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import history from 'utils/history';
import formatCurrency from 'utils/formatCurrency';
import Grid from 'components/Grid';
import Row from 'components/Row';
import Steps from 'components/Steps';
import Button from 'components/Form/Button';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

const Container = styled.div`
  background: #fff;
  padding-right: 0;
`;

const StepsContainer = styled.div`
  width: 100%;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`;

// Precisa esperar ficar pronta a API do cupom
// const FlexRowCoupon = styled(FlexRow)`
//   color: #5bc057;
// `;

const FlexRowFinal = styled(FlexRow)`
  font-weight: bold;
`;

const SuccessMessage = styled.span`
  color: #94d470;
  font-weight: bold;
  font-size: 20px;
`;

const SendWhatsapp = styled.span`
  color: #006195;
  cursor: pointer;

  :hover {
    text-decoration: underline #006195;
  }
`;

const ThanksMessage = styled.p`
  color: #212121;
  font-weight: bold;
`;

const Receipt = styled.div`
  background-color: hsla(0, 0%, 43%, 0.1);
  padding: 7px 14px;
`;

const ReceiptNumber = styled.p`
  margin-bottom: 0;
`;

const ReceiptObservation = styled(ReceiptNumber)`
  margin-top: 15px;
`;

const ReceiptCode = styled.h3``;

const Divider = styled.hr`
  border: 1px solid #fff;
`;

const Footer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
`;

const Conclusion = ({ intl }) => {
  const { shoppingCart } = useContext(ShoppingCartContext);
  console.log({ shoppingCart });
  const {
    address, personData,
    paymentType, withdraw,
    totalCart, deliveryFee,
    cart, orderId,
  } = shoppingCart;
  const {
    email, name, documento, foneFormatted,
  } = personData;
  const {
    cep,
    endereco,
    bairro,
    cidade,
    estado,
    numero,
    complemento,
    tipoLogradouro,
  } = address;
  const withdrawText = withdraw ? '* Retirar no estabelecimento' : '';

  const productPrice = product => intl.formatNumber(
    (product.pricing.product + product.pricing.modifiers) * product.quantity,
    { style: 'currency', currency: 'BRL' },
  );

  return (
    <Container className="row">
      <Grid cols="12 12 12 12 12" className="pt-3">
        <StepsContainer>
          <Steps activeIndex={4} />
        </StepsContainer>
        <FlexRow>
          <SuccessMessage>
            Seu pedido foi finalizado com sucesso
          </SuccessMessage>
          <SendWhatsapp onClick={() => { console.log('Hi') }}>Enviar confirmação por Whatsapp</SendWhatsapp>
        </FlexRow>
        <ThanksMessage>
          {`Obrigada pela compra! Você receberá todos os dados da sua contra no email: ${email}`}
        </ThanksMessage>

        <Receipt>
          <ReceiptNumber>Número do pedido:</ReceiptNumber>
          <ReceiptCode>{orderId}</ReceiptCode>
          {cart.map(item => (
            <FlexRow key={item.uuid}>
              <span>
                {`${item.descricao} (x${item.quantity})`}
              </span>
              <span>{productPrice(item)}</span>
            </FlexRow>
          ))}
          {/* Precisa esperar a API de desconto ficar pronta */}
          {/* <FlexRowCoupon>
          <span>Cupom de desconto</span>
          <span>R$ -5,00</span>
        </FlexRowCoupon> */}
          <Divider />
          <FlexRow>
            <span>Total</span>
            <span>{formatCurrency(totalCart)}</span>
          </FlexRow>
          <FlexRow>
            <span>Entrega</span>
            <span>{formatCurrency(deliveryFee ? deliveryFee.cost : 0)}</span>
          </FlexRow>
          <Divider />
          <FlexRowFinal>
            <span>Final:</span>
            <span>{formatCurrency(totalCart + (deliveryFee ? deliveryFee.cost : 0))}</span>
          </FlexRowFinal>
          <ReceiptObservation>
            {withdrawText}
          </ReceiptObservation>
        </Receipt>
        <Footer>
          <div>
            <h4>Dados Pessoais:</h4>
            <span>{name}</span>
            <br />
            <span>
              {`CPF: ${documento}`}
            </span>
            <br />
            <span>{email}</span>
            <br />
            <span>
              {`Telefone: ${foneFormatted}`}
            </span>
          </div>
          <div>
            <h4>Endereço:</h4>
            <span>
              {`${tipoLogradouro} ${endereco}, ${numero} - ${bairro}`}
            </span>
            <br />
            <span>
              {`${cidade} / ${estado}`}
            </span>
            <br />
            <span>
              {`CEP: ${cep}`}
            </span>
            <br />
            <span>
              {`Complemento: ${complemento}`}
            </span>
            <br />
          </div>
          <div>
            <h4>Pagamento:</h4>
            <p>{paymentType}</p>
          </div>
        </Footer>
        <Row className="d-flex justify-content-end pb-4 pr-3">
          <Button value="Voltar" onClick={() => history.push('/')} />
        </Row>
      </Grid>
    </Container>
  );
};

Conclusion.propTypes = {
  intl: intlShape.isRequired,
  // product: PropTypes.any.isRequired,
};


export default injectIntl(Conclusion);
