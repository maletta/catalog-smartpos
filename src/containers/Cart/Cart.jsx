import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import Swal from 'sweetalert2';

import Button from 'components/Form/Button';
import CartItem from 'components/CartItem';
import Grid from 'components/Grid';
import history from 'utils/history';
import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';


import ClosedStore from '../../assets/closed-store.svg';

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
  const { shop } = useContext(ShopContext);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [totalCar, setTotalCar] = useState(0);
  const { updateShoppingCart } = useContext(ShoppingCartContext);

  const deleteItem = (item) => {
    const newCart = cart.filter(del => (del.uuid !== item.uuid));
    setStateCar(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateAmount = (value, prodIndex) => {
    const updateAmountCar = stateCart;
    updateAmountCar[prodIndex].quantity = value;
    setStateCar(updateAmountCar);
    setForceUpdate(updateAmountCar[prodIndex].quantity);
    localStorage.setItem('cart', JSON.stringify(updateAmountCar));
  };


  useEffect(() => {
    const total = stateCart.reduce(
      (count, val) => (count + (val.quantity * (val.pricing.modifiers + val.pricing.product))), 0,
    );
    const basketCount = stateCart.reduce((count, val) => (count + val.quantity), 0);
    updateFilter({
      categoria: 0, label: 'Carrinho', page: 1, search: '',
    });
    updateShoppingCart({
      basketCount,
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
                {'O seu carrinho está vazio'}
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
                {'Total:'}
                {intl.formatNumber(totalCar, { style: 'currency', currency: 'BRL' })}
              </Total>
            </div>
          </Grid>
          <Grid
            cols="7 7 8 9 10"
            className="d-flex justify-content-end"
          >
            <Button
              className="d-none d-md-block"
              value="Adicionar mais itens"
              type="submit"
              styleType="secondary"
              onClick={() => {
                updateFilter({
                  categoria: 0, label: 'Todas as categorias', page: 1, search: '',
                });
                history.push('/');
              }}
            />
          </Grid>
          <Grid
            cols="5 5 4 3 2"
            className="d-flex justify-content-end"
          >
            <Button
              value="Finalizar pedido"
              onClick={() => {
                if (!shop.closedNow) {
                  history.push('/checkout');
                } else {
                  Swal.fire({
                    html: `<div>
                      <div><img src="${ClosedStore}"></div>
                      <span class="foradohorario-titulo"> ${!shop.openHour.closed ? 'Estabelecimento fechado!' : `Este estabelecimento abre entre ${shop.openHour.openHour} - ${shop.openHour.closeHour}`}</span>
                      <p class="foradohorario-texto">Você pode olhar o catálogo à vontade e fazer o pedido quando o estabelecimento estiver aberto.</p>
                    </div>`,
                    showConfirmButton: true,
                    confirmButtonColor: '#F38A00',
                    showCloseButton: true,
                  }).then(() => {
                    history.push('/');
                  });
                }
              }}
            />
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
