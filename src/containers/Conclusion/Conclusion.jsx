import React from "react";
import styled from "styled-components";

import history from "utils/history";
import Grid from "components/Grid";
import Row from "components/Row";
import Steps from "components/Steps";
import Button from "components/Form/Button";

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

const FlexRowCoupon = styled(FlexRow)`
  color: #5bc057;
`;

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

const FooterCard = styled.div`
  width: 200px;
`;

const Conclusion = () => {
  return (
    <Container className="row">
      <Grid cols="12 12 12 12 12" className="pt-3">
        <StepsContainer>
          <Steps activeIndex={4} />
        </StepsContainer>
        <FlexRow>
          <SuccessMessage>
            {"Seu pedido foi finalizado com sucesso"}
          </SuccessMessage>
          <SendWhatsapp>{"Enviar confirmação por Whatsapp"}</SendWhatsapp>
        </FlexRow>
        <ThanksMessage>
          {
            "Obrigada pela compra! Você receberá todos os dados da sua contra no email: xxx@gmail.com"
          }
        </ThanksMessage>

        <Receipt>
          <ReceiptNumber>{"Número do pedido:"}</ReceiptNumber>
          <ReceiptCode>{"PN-24"}</ReceiptCode>
          <FlexRow>
            <span>{"Pascal o coelho"}</span>
            <span>{"R$ 35,00"}</span>
          </FlexRow>
          <FlexRowCoupon>
            <span>{"Cupom de desconto"}</span>
            <span>{"R$ -5,00"}</span>
          </FlexRowCoupon>
          <Divider />
          <FlexRow>
            <span>{"Total"}</span>
            <span>{"R$ 30,00"}</span>
          </FlexRow>
          <FlexRow>
            <span>{"Entrega"}</span>
            <span>{"R$ 0,00"}</span>
          </FlexRow>
          <Divider />
          <FlexRowFinal>
            <span>{"Final:"}</span>
            <span>{"R$ 30,00"}</span>
          </FlexRowFinal>
          <ReceiptObservation>
            {"* Retirar no estabelecimento"}
          </ReceiptObservation>
        </Receipt>
        <Footer>
          <div>
            <h4>{"Dados Pessoais:"}</h4>
            <span>{"Danielle Peredelski"}</span>
            <br />
            <span>{"CPF: 424.360.598-02"}</span>
            <br />
            <span>{"danielle@netpos.com.br"}</span>
            <br />
            <span>{"Telefone: (11) 98028-2222"}</span>
          </div>
          <div>
            <h4>{"Endereço:"}</h4>
            <span>{"Rua Cavour, 399"}</span>
            <br />
            <span>{"Vila Prudente / SP"}</span>
            <br />
            <span>{"CEP: 03136-010"}</span>
            <br />
          </div>
          <div>
            <h4>{"Pagamento:"}</h4>
            <p>{"Cartão de crédito"}</p>
          </div>
        </Footer>
        <Row className="d-flex justify-content-end pb-4 pr-3">
          <Button value="Voltar" onClick={() => history.push("/payment")} />
        </Row>
      </Grid>
    </Container>
  );
};

export default Conclusion;
