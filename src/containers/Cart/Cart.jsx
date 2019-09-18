import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';

import Button from 'components/Form/Button';
import CartItem from 'components/CartItem';
import Grid from 'components/Grid';
import history from 'utils/history';
import FilterContext from 'contexts/FilterContext';

const Container = styled.div`
  background: #fff;
  border-radius: 5px;
  padding-bottom: 15px;
`;

const TitleEmptyCar = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: lighter;
  margin: 80px 80px;
`;

const Total = styled.span`
  font-size: 2rem;
`;

const Cart = ({ intl }) => {
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const { updateFilter } = useContext(FilterContext);
  const [stateCart, setStateCar] = useState(cart);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [totalCar, setTotalCar] = useState(0);

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
    const total = stateCart.reduce(
      (count, val) => (count + (val.amount * (val.pricing.modifiers + val.pricing.product))), 0,
    );
    updateFilter({
      label: 'Carrinho',
    });
    setTotalCar(total);
  }, [stateCart.length, forceUpdate]);


  return (
    <Container className="row">
      <Grid
        cols="12 12 12 12 12"
      >
        <ul>
          {stateCart.map((product, prodIndex) => (
            <CartItem
              key={product.uuid}
              product={product}
              prodIndex={prodIndex}
              deleteItem={deleteItem}
              updateAmount={updateAmount}
            />
          ))}
        </ul>
        {(stateCart.length < 1) && (
          <Grid
            cols="12"
            className="d-flex flex-column align-items-center"
            style={{ minHeight: '40vh' }}
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
            cols="12 12 12 12 12"
            className="d-flex justify-content-end align-items-center"
          >
            <div
              className="mb-2 mt-2"
            >
              <Total>
                Total:
                {intl.formatNumber(totalCar, { style: 'currency', currency: 'BRL' })}
              </Total>
            </div>
          </Grid>
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
