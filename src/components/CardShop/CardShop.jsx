import React, { useState, useContext, useLayoutEffect } from 'react';
import styled from 'styled-components';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import history from 'utils/history';
import { injectIntl, intlShape } from 'react-intl';
import slug from 'utils/slug';
import isEmpty from 'lodash/isEmpty';
import Trash from '../../assets/trash.svg';
import EmptyCart from '../../assets/emptyCart.svg';
import Close from '../../assets/close.svg';
import ImageBox from './Image';

const Overlay = styled.div`
  position: fixed;
  right: 0;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 7777;
  ${props => props.closeCardOverlay && ' display: flex;'}
  ${props => !props.closeCardOverlay && 'display: none;'}

  @media (max-width: 768px) {
    opacity: 0.8;
  }
`;
const CardOverlay = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: fixed;
  right: 0;
  background-color: white;
  width: 350px;

  @media (max-width: 768px) {
    width: 300px;
  }

  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 8888;
  overflow: scroll;
  ${props => !props.closeCardOverlay && 'display: none;'}
  ${`
  ::-webkit-scrollbar-track
    {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: white;
    }

  ::-webkit-scrollbar
    {
      width: 6px;
      height: 2px;
      background-color: #F5F5F5;
    }

  ::-webkit-scrollbar-thumb
    {
      background-color: #F38A00;
      border: 1px solid #black;
    }
  `}
`;
const HeaderCard = styled.div`
  width: 100%;
  height: 45px;
  color: white;
  background-color: var(--color-header);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  font-size: 14px;
  font-weight: 500;
  padding: 10px;
  margin-bottom: 10px;
`;

const CloseCart = styled.span`
  display: flex;
  flex: 1;
  padding-left: 80px;

  @media (max-width: 768px) {
    padding-left: 50px;
  }
`;

const TitleCart = styled.span`
  padding-left: 110px;

  @media (max-width: 768px) {
    padding-left: 90px;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
  margin-left: 15px;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 150px;
`;

const Description = styled.span`
  font-weight: 700;
  font-size: 12px;
  margin-left: 25px;
`;

const Quantity = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  margin-left: 20px;
`;

const QuantityText = styled.span`
  font-weight: 500;
  font-size: 10px;
  margin-left: 5px;
  margin-top: 20px;
  color: gray;
`;


const ControlQuantity = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid lightgray;
  border-radius: 2px;
  margin-top: 5px;
  margin-left: 2px;
  padding-left: 10px;
`;
const Delete = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 30px;
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 12px;
  justify-content: flex-start;
  margin-top: 50px;
  margin-bottom: -50px;
  margin-left: -20px;
  padding-bottom: 10px;
`;

const IconDelete = styled.img`
  cursor: pointer;
  justify-content: flex-end;
  margin-left: 10px;
`;

const Controls = styled.div`
  color: var(--color-primary);
  margin-right: 10px;
  cursor: pointer;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
`;

const EmptyTitle = styled.span`
  font-weight: 700;
  margin-top: 50px;
`;

const EmptySubTitle = styled.span`
  margin: 30px;
  margin-top: 10px;
  text-align: center;
`;

const TotalTitle = styled.div`
  font-weight: 700;
  color: var(--color-header);
  margin-left: 15px;
`;

const SubTotalTitle = styled.div`
  font-weight: 700;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
`;


const Value = styled.div`
  justify-self: flex-end;
  margin-right: 15px;
`;

const TextTotal = styled.div`
  justify-self: flex-start;
  flex: 1;
`;

const Finish = styled.div`
  background-color: var(--color-primary);
  color: white;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  cursor: pointer;
`;

const BuyMore = styled.div`
  background-color: white;
  color: var(--color-primary);
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  cursor: pointer;
`;

const FinishText = styled.span`
  padding: 15px;
`;

const ControlButton = styled.span`
  color: black;
`;

const CloseIcon = styled.img`
  cursor: pointer;
`;


const CardShop = ({ intl }) => {
  const [closeCardOverlay, setCardOverlay] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const [stateCart, setStateCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);

  useLayoutEffect(() => {
    setCardOverlay(shoppingCart.cardOverlay);

    setStateCart(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    if (stateCart.reduce((count, val) => (count + val.quantity), 0) !== shoppingCart.basketCount) {
      updateShoppingCart({
        basketCount: stateCart.reduce((count, val) => (count + val.quantity), 0),
        cardOverlay: true,
      });
    }

    const total = stateCart.reduce(
      (count, val) => (count + (val.quantity * (val.pricing.modifiers + val.pricing.product))), 0,
    );
    setTotalCart(total);
  }, [shoppingCart]);

  const closeCard = () => {
    setCardOverlay(!closeCardOverlay);
  };

  const deleteItem = (item) => {
    const newCart = stateCart.filter(del => (del.uuid !== item.uuid));
    setStateCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateShoppingCart({
      basketCount: stateCart.length,
      cardOverlay: true,
    });

    const total = stateCart.reduce(
      (count, val) => (count + (val.quantity * (val.pricing.modifiers + val.pricing.product))), 0,
    );
    setTotalCart(total);
  };

  const addProduct = (item) => {
    const { quantity } = item;
    const newQuantity = quantity + 1;
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cart.map((i, index) => {
      if (i.uuid === item.uuid) {
        cart[index].quantity = newQuantity;
      }
      return false;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    setStateCart(cart);
    const basketCount = stateCart.reduce((count, val) => (count + val.quantity), 0);
    updateShoppingCart({
      basketCount,
    });
  };

  const removeProduct = (item) => {
    const { quantity } = item;
    const newQuantity = quantity - 1;
    if (newQuantity === 0) {
      deleteItem(item);
    } else {
      const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      cart.map((i, index) => {
        if (i.uuid === item.uuid) {
          cart[index].quantity = newQuantity;
        }
        return false;
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      setStateCart(cart);
      const basketCount = stateCart.reduce((count, val) => (count + val.quantity), 0);
      updateShoppingCart({
        basketCount,
      });
    }
  };

  return (
    <>
      <Overlay
        onClick={() => closeCard()}
        closeCardOverlay={closeCardOverlay}
      />
      <CardOverlay closeCardOverlay={closeCardOverlay}>
        <HeaderCard>
          <TitleCart>{`Meu carrinho (${shoppingCart.basketCount})`}</TitleCart>
          <CloseCart>
            <CloseIcon src={Close} width="15px;" alt="close" onClick={() => closeCard()} />
          </CloseCart>
        </HeaderCard>
        <div>

          {stateCart.length > 0 ? (
            <>
              {stateCart.map(item => (
                <div key={item.codigo}>
                  <Item>
                    <ImageContainer onClick={() => setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      closeCard(false);
                      history.push(`/item/${item.id}/${slug(item.descricao)}`);
                      window.location.reload();
                    }, 500)}
                    >

                      <div className="card-image">
                        {item && <ImageBox url={`${process.env.REACT_APP_IMG_API}product/${item.id}?lastUpdate=${item.atualizacao}`} shoppingCart={shoppingCart} product={item} />}
                      </div>
                    </ImageContainer>
                    <Info>
                      <Description>
                        {`${item.descricao}${!isEmpty(item.variant) ? ` (${item.variant.name})` : ('')}`}
                      </Description>
                      <Quantity>
                        <QuantityText> Quantidade </QuantityText>
                        <ControlQuantity>
                          <Controls>
                            <ControlButton onClick={() => removeProduct(item)}> - </ControlButton>
                          </Controls>
                          <Controls>
                            <span>
                              {item.quantity}
                            </span>
                          </Controls>
                          <Controls>
                            <ControlButton onClick={() => addProduct(item)}> + </ControlButton>
                          </Controls>
                        </ControlQuantity>
                      </Quantity>
                    </Info>
                    <Delete>
                      <IconDelete src={Trash} onClick={() => deleteItem(item)} />
                      <Price>
                        {item.pricing && intl.formatNumber((item.pricing.product + item.pricing.modifiers) * item.quantity, { style: 'currency', currency: 'BRL' })}
                      </Price>
                    </Delete>
                    <div />
                  </Item>
                  <hr />
                </div>

              ))}
              <span>
                <TotalTitle>
                  Resumo do pedido
                </TotalTitle>
                <SubTotalTitle>
                  <TextTotal>SubTotal: </TextTotal>
                  <Value>{ intl.formatNumber((totalCart), { style: 'currency', currency: 'BRL' }) }</Value>
                </SubTotalTitle>
                <Finish onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    updateShoppingCart({
                      cardOverlay: false,
                    });
                    history.push('/cart');
                  }, 500);
                }}
                >
                  <FinishText>
                    <span>
                       FINALIZAR COMPRA
                    </span>
                  </FinishText>
                </Finish>

                <BuyMore onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    closeCard(false);
                    history.push('/');
                  }, 500);
                }}
                >
                  <span>
                       ADICIONAR MAIS PRODUTOS
                  </span>
                </BuyMore>
              </span>
            </>
          ) : (
            <EmptyState>
              <img alt="empty" src={EmptyCart} width="180px;" />
              <EmptyTitle>Seu carrinho está vazio</EmptyTitle>
              <EmptySubTitle>
                Navegue pelo site e escolha os
                produtos desejados para adicionar em seu carrinho de compras.
              </EmptySubTitle>
            </EmptyState>
          ) }
        </div>
      </CardOverlay>
    </>
  );
};

CardShop.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CardShop);
