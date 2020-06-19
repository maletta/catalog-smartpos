import React, { useState } from "react";
import styled from "styled-components";

import history from "utils/history";
import Grid from "components/Grid";
import Row from "components/Row";
import Steps from "components/Steps";
import SectionTitle from "components/SectionTitle";
import Button from "components/Form/Button";
import PurchasePrices from "containers/Cart/components/PurchasePrices";

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
  flex-wrap: wrap;
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

const Conclusion = () => {
  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
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
        <p>{"Número do pedido:"}</p>
        <h2>{"PN-24"}</h2>
        <div>
          <span>{"Pascal o coelho"}</span>
          <span>{"R$ 35,00"}</span>
        </div>
        <div>
          <span>{"Cupom de desconto"}</span>
          <span>{"R$ -5,00"}</span>
        </div>
        <hr />
        <div>
          <span>{"Total"}</span>
          <span>{"R$ 30,00"}</span>
        </div>
        <div>
          <span>{"Entrega"}</span>
          <span>{"R$ 0,00"}</span>
        </div>
        <div>
          <span>{"Final:"}</span>
          <span>{"R$ 30,00"}</span>
        </div>
        <p>{"* Retirar no estabelecimento"}</p>
        <div>
          <h4>{"Dados Pessoais:"}</h4>
          <p>
            {
              "Danielle Peredelski CPF: 424.360.598-02 danielle@netpos.com.br Telefone: (11) 98028-2222"
            }
          </p>
          <h4>{"Endereço::"}</h4>
          <p>{"Rua Cavour, 399 Vila Prudente / SP CEP: 03136-010"}</p>
          <h4>{"Pagamento::"}</h4>
          <p>{"Cartão de crédito"}</p>
        </div>

        <Row className="d-flex justify-content-end pb-4 pr-3">
          <Button value="Próximo" onClick={() => history.push("/payment")} />
        </Row>
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          // basketCountCart={basketCountCart}
          // totalCart={totalCart}
          // deliveryCost={deliveryCost}
          basketCountCart={0}
          totalCart={0}
          deliveryCost={{}}
          couponValue={-5}
        />
      </Grid>
    </Container>
  );
};

export default Conclusion;
