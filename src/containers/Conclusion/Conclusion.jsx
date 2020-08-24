import React, { useContext } from 'react';
import styled from 'styled-components';

import paths from 'paths';
import history from 'utils/history';
import Grid from 'components/Grid';
import Row from 'components/Row';
import Steps from 'components/Steps';
import Button from 'components/Form/Button';
import ShopContext from 'contexts/ShopContext';
import formatCurrency from 'utils/formatCurrency';
import { calculateDiscountCoupon } from 'utils/coupon';

import SuccessMessage from './components/SuccessMessage';
import WhatsappLink from './components/WhatsappLink';
import ThanksMessage from './components/ThanksMessage';
import ReceiptItem from './components/ReceiptItem';
import SubTotal from './components/SubTotal';
import Coupon from './components/Coupon';
import Delivery from './components/Delivery';
import Total from './components/Total';
import PersonalData from './components/PersonalData';
import PersonalAddress from './components/PersonalAddress';

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

const FlexRowFinal = styled(FlexRow)`
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

const Divider = styled.hr`
  border: 1px solid #fff;
`;

const Footer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
`;

const Conclusion = () => {
  const { shop, orderPlaced } = useContext(ShopContext);

  const {
    address,
    personData,
    pagamento,
    withdraw,
    totalCart,
    deliveryFee,
    cart,
    orderName,
    change,
    changeReceivedValue,
    coupon,
  } = orderPlaced;

  const {
    email, name, documento, foneFormatted,
  } = personData;

  const withdrawText = withdraw ? '* Retirar no estabelecimento' : '';

  const couponValue = calculateDiscountCoupon(coupon, totalCart);
  const total = totalCart - couponValue;
  const positiveTotal = total > 0 ? total : 0;

  const handleGoBack = () => {
    history.push(paths.home);
  };

  return (
    <Container className="row">
      <Grid cols="12 12 12 12 12" className="pt-3">
        <StepsContainer>
          <Steps activeIndex={4} />
        </StepsContainer>
        <FlexRow>
          <SuccessMessage />
          <WhatsappLink orderId={orderName} whatsapp={shop.whatsapp} />
        </FlexRow>
        <ThanksMessage email={email} />
        <Receipt>
          <ReceiptNumber>Número do pedido:</ReceiptNumber>
          <h3>{orderName}</h3>
          {cart.map(item => (
            <FlexRow key={item.uuid}>
              <ReceiptItem item={item} />
            </FlexRow>
          ))}
          {
            couponValue > 0 && (
              <FlexRow>
                <Coupon />
              </FlexRow>
            )
          }
          <Divider />
          <FlexRow>
            <SubTotal subTotal={positiveTotal} />
          </FlexRow>
          {
            withdraw ? null : (
              <FlexRow>
                <Delivery deliveryCost={deliveryFee} />
              </FlexRow>
            )
          }
          {
            changeReceivedValue > 0
              ? (
                <FlexRow>
                  <span>Valor a receber pela loja</span>
                  <span>{formatCurrency(changeReceivedValue)}</span>
                </FlexRow>
              )
              : null
          }
          {
            change > 0
              ? (
                <FlexRow>
                  <span>Troco</span>
                  <span>{formatCurrency(change)}</span>
                </FlexRow>
              )
              : null
          }
          <Divider />
          <FlexRowFinal>
            <Total total={positiveTotal + deliveryFee} />
          </FlexRowFinal>
          <ReceiptObservation>
            {withdrawText}
          </ReceiptObservation>
        </Receipt>
        <Footer>
          <PersonalData
            name={name}
            email={email}
            phone={foneFormatted}
            cpf={documento}
          />
          <PersonalAddress address={address} />
          <div>
            <h4>Pagamento:</h4>
            <p>{pagamento.descricao || 'Cartão de Crédito'}</p>
          </div>
        </Footer>
        <Row className="d-flex justify-content-end pb-4 pr-3">
          <Button value="Voltar" onClick={handleGoBack} />
        </Row>
      </Grid>
    </Container>
  );
};

Conclusion.propTypes = {};

export default Conclusion;
