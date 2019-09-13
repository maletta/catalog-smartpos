import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';

import Counter from 'components/Form/Counter';
import Button from 'components/Form/Button';

import Grid from 'components/Grid';
import history from 'utils/history';

const Container = styled.div`
  background: #fff;
  border-radius: 5px;
  padding-bottom: 15px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid #eee;
`;

const TitleItem = styled.h2`
  font-weight: 600;
  color: #363636;
`;

const ItemDescription = styled.span`
  color: #333;
  font-size: 0.9rem;
`;

const ItemPricing = styled.span`
  color: #333;
  font-size: 1.9rem;
`;

const AreaControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ControlAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 25px 0 0;
`;

const ControlExclude = styled.button`
  color: #00529b;
  background: #fff;
  border: 0;
`;

const TitleEmptyCar = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: lighter;
  margin: 80px 80px;
`;

const Cart = ({ intl }) => {
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const [stateCart, setStateCar] = useState(cart);
  const [forceUpdate, setForceUpdate] = useState(0);

  const deleteItem = (item) => {
    const newCart = cart.filter(del => (del.uuid !== item.uuid));
    setStateCar(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateAmount = (value, prodIndex) => {
    const updateAmountCar = stateCart;
    updateAmountCar[prodIndex].amount = value;
    setStateCar(updateAmountCar);
    setForceUpdate(updateAmountCar[prodIndex].amount);
    localStorage.setItem('cart', JSON.stringify(updateAmountCar));
  };


  useEffect(() => {
  }, [stateCart.length, forceUpdate]);


  return (
    <Container className="row">
      <Grid
        cols="12 12 12 12 12"
        className="mb-3"
      >
        <ul>
          {stateCart.map((product, prodIndex) => (
            <ListItem key={product.uuid}>
              <>
                <div>
                  <TitleItem>{`${product.descricao} ${(product.variant.name) ? `- ${product.variant.name}` : ''}`}</TitleItem>
                  <ItemDescription>
                    {product.modifiers.map((modifier, modIndex) => (
                      modifier.map((item, index) => ((modIndex || index) ? `${item.name} ` : `${item.name} | `))
                    ))}
                  </ItemDescription>
                </div>
                <AreaControl>
                  <ControlAmount>
                    <Counter
                      limit={100}
                      min={1}
                      value={product.amount}
                      counter={(amount) => {
                        updateAmount(amount, prodIndex);
                      }}
                    />
                    <div>
                      <ControlExclude
                        onClick={() => deleteItem(product)}
                      >
                        Excluir
                      </ControlExclude>
                    </div>
                  </ControlAmount>
                  <ItemPricing>
                    {intl.formatNumber((product.pricing.product + product.pricing.modifiers) * product.amount, { style: 'currency', currency: 'BRL' })}
                  </ItemPricing>
                </AreaControl>
              </>
            </ListItem>
          ))}
        </ul>
        {(stateCart.length < 1) && (
          <Grid
            cols="12"
            className="d-flex flex-column align-items-center"
          >
            <div>
              <TitleEmptyCar>
                O seu carrinho está vazio
              </TitleEmptyCar>
            </div>
            <div>
              <Button
                value="Adicionar itens"
                type="submit"
                styleType="secondary"
                onClick={() => {
                  history.push('/');
                }}
              />
            </div>
          </Grid>
        )}
      </Grid>
      {(stateCart.length > 0) && (
        <>
          <Grid
            cols="12 7 8 9 9"
            className="d-flex justify-content-end"
          >
            <div>
              <Button
                value="Adicionar mais itens"
                type="submit"
                styleType="secondary"
                onClick={() => {
                  history.push('/');
                }}
              />
            </div>
          </Grid>
          <Grid
            cols="12 5 4 3 3"
            className="d-flex justify-content-end mt-2 mt-sm-0"
          >
            <div>
              <Button
                value="Finalizar pedido"
                type="submit"
              />
            </div>
          </Grid>
        </>
      )}
    </Container>
  );
};

Cart.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Cart);
