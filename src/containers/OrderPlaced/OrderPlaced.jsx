import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';

import Grid from 'components/Grid';
import Row from 'components/Row';
import Button from 'components/Form/Button';
import ShopContext from 'contexts/ShopContext';
import FilterContext from 'contexts/FilterContext';
import history from 'utils/history';

const ContainerCheckout = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
`;

const TitlePage = styled.h1`
  color: #94d470;
  font-size: 1.5rem;
`;

const Acknowledgment = styled.p`
  font-weight: 600;
`;

const LinkToWhatsApp = styled.a`
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;

const NumberOrder = styled.div`
  font-size: 1.15rem;
  font-weight: 400;
`;

const CodeOrder = styled.div`
  font-size: 2rem;
  font-weight: 500;
`;

const TitleCustomer = styled.h5`
  color: #434343;
  font-size: 1.05rem;
`;

const Ul = styled.ul`
  list-style-type: none;
  padding-inline-start: 0;
`;

const Item = styled.li`
  padding: 5px 0 5px 0;
  display: flex;
  justify-content: space-between;
`;

const ItemValue = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
`;

const Seperator = styled.hr`
  background: #fff;
  border-color: #fff;
`;

const TotalValue = styled.div`
  font-weight: 600;
  font-size: 1rem;
`;

const OrderPlaced = ({ intl }) => {
  const { shop, orderPlaced } = useContext(ShopContext);
  const { updateFilter } = useContext(FilterContext);
  const msg = `Você acabou de receber o pedido ${orderPlaced.orderName} do seu catálogo on-line SmartPOS, acesse o app ou site e verifique nos pedidos em aberto.`;
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=55${shop.whatsapp}&text=${encodeURIComponent(msg)}`;
  const totalItens = orderPlaced.orderProducts.reduce(
    (count, val) => (count + (val.quantity * (val.pricing.modifiers + val.pricing.product))), 0,
  );
  const total = (orderPlaced.withdraw ? totalItens : (orderPlaced.coastDelivery + totalItens));

  useEffect(() => {
    window.scrollTo(0, 0);
    updateFilter({
      label: 'Pedido enviado',
    });
  }, []);

  return (
    <div>
      <ContainerCheckout>
        <Row>
          <Grid
            cols="12 12 12 12 9"
          >
            <TitlePage>
              Seu pedido foi realizado com sucesso
            </TitlePage>
            <Acknowledgment>
              {`Obrigado pela compra! Você receberá todos os dados da sua compra no e-mail: ${orderPlaced.email}`}
            </Acknowledgment>
          </Grid>
          <Grid cols="12 12 12 4 3">
            <LinkToWhatsApp
              href={linkWhatsApp}
              target="blank"
            >
              {'Enviar confirmação por WhatsApp.'}
            </LinkToWhatsApp>
          </Grid>
        </Row>
        <Row>
          <Grid
            cols="12"
            className="mt-2 mb-3"
          >
            <div style={{ background: '#f0f0f0' }}>
              <div className="ml-2 ml-md-4 mr-2 pb-1">
                <NumberOrder>
                  {'Número do pedido:'}
                </NumberOrder>
                <CodeOrder>
                  {orderPlaced.orderName}
                </CodeOrder>
                <Ul>
                  {orderPlaced.orderProducts.map(item => (
                    <Item>
                      <>
                        <ItemValue>{item.descricao}</ItemValue>
                        <ItemValue>{`${item.quantity} X ${intl.formatNumber((item.pricing.product + item.pricing.modifiers), { style: 'currency', currency: 'BRL' })}`}</ItemValue>
                      </>
                    </Item>
                  ))}
                  <Item>
                    <>
                      <ItemValue>Entregra</ItemValue>
                      <ItemValue>{intl.formatNumber((orderPlaced.withdraw ? 0 : orderPlaced.coastDelivery), { style: 'currency', currency: 'BRL' })}</ItemValue>
                    </>
                  </Item>
                </Ul>
                <Seperator />
                <Ul>
                  <Item>
                    <>
                      <TotalValue>Total</TotalValue>
                      <TotalValue>{intl.formatNumber(total, { style: 'currency', currency: 'BRL' })}</TotalValue>
                    </>
                  </Item>
                </Ul>
                {(orderPlaced.withdraw) && (
                  <p>
                    {'* Retirar no estabelecimento'}
                  </p>
                )}
              </div>
            </div>
          </Grid>
        </Row>
        <Row>
          <Grid
            cols="12 6 4 4 4"
            className="mt-2 mt-md-0"
          >
            <TitleCustomer>
              {'Dados Pessoais:'}
            </TitleCustomer>
            <div>{orderPlaced.name}</div>
            <div>{`CPF: ${orderPlaced.documento}`}</div>
            <div>{orderPlaced.email}</div>
            <div>{`Telefone: ${orderPlaced.fone}`}</div>
          </Grid>
          <Grid
            cols="12 6 4 4 4"
            className="mt-2 mt-md-0"
          >
            <TitleCustomer>
              {'Endereço:'}
            </TitleCustomer>
            <div>{`${orderPlaced.tipoLogradouro} ${orderPlaced.endereco}, ${orderPlaced.numero}`}</div>
            <div>{`${orderPlaced.bairro} / ${orderPlaced.estado}`}</div>
            <div>{`CEP: ${orderPlaced.cep}`}</div>
          </Grid>
          <Grid
            cols="12 4 4 4 4"
            className="mt-2 mt-md-0"
          >
            <TitleCustomer>
              {'Pagamento:'}
            </TitleCustomer>
            {(orderPlaced.gatwayPagseguro) && (<div>Cartão de crédito</div>)}
            {(orderPlaced.offlinePayment) && (<div>Diretamente com o vendedor</div>)}
          </Grid>
        </Row>
      </ContainerCheckout>
      <Row>
        <Grid
          cols="12"
          className="d-flex justify-content-end mt-2"
        >
          <div>
            <Button
              value="Voltar"
              onClick={() => {
                history.push('/');
              }}
            />
          </div>
        </Grid>
      </Row>
    </div>
  );
};

OrderPlaced.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(OrderPlaced);
