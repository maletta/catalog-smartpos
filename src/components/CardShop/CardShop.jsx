import React, { useState, useContext, useLayoutEffect } from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import paths from 'paths';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import storage from 'utils/storage';
import history from 'utils/history';
import utilsCart from 'utils/cart';
import slug from 'utils/slug';
import formatCurrency from 'utils/formatCurrency';
import Trash from 'assets/trash.svg';

import ImageBox from './components/Image';
import EmptyCartMessage from './components/EmptyCartMessage';
import CartHeader from './components/CartHeader';
import ItemQuantity from './components/ItemQuantity';

const Overlay = styled.div`
  position: fixed;
  right: 0;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 2;
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

const CardShop = () => {
  const [closeCardOverlay, setCardOverlay] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const [stateCart, setStateCart] = useState(storage.getLocalCart());

  useLayoutEffect(() => {
    setCardOverlay(shoppingCart.cardOverlay);
    setStateCart(storage.getLocalCart());

    if (utilsCart.sumCartQuantity(stateCart) !== shoppingCart.basketCount) {
      updateShoppingCart({
        basketCount: utilsCart.sumCartQuantity(stateCart),
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
    storage.updateLocalCart(newCart);
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
    const cart = storage.getLocalCart();

    cart.map((i, index) => {
      if (i.uuid === item.uuid) {
        cart[index].quantity = newQuantity;
      }

      return false;
    });

    storage.updateLocalCart(cart);

    setStateCart(cart);

    const basketCount = utilsCart.sumCartQuantity(stateCart);

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
      const cart = storage.getLocalCart();
      cart.map((i, index) => {
        if (i.uuid === item.uuid) {
          cart[index].quantity = newQuantity;
        }
        return false;
      });

      storage.updateLocalCart(cart);
      setStateCart(cart);
      const basketCount = utilsCart.sumCartQuantity(stateCart);
      updateShoppingCart({
        basketCount,
      });
    }
  };

  const hasItems = stateCart.length > 0;

  const calculateItemPrice = (item) => {
    const { pricing, quantity } = item;
    const { product, modifiers } = pricing;

    return formatCurrency((product + modifiers) * quantity);
  };

  const reloadPage = () => window.location.reload();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const createItemImageURL = (item) => {
    const { id, atualizacao } = item;
    const baseImgURL = process.env.REACT_APP_IMG_API;
    return `${baseImgURL}product/${id}?lastUpdate=${atualizacao}`;
  };

  const createVariantText = (item) => {
    const { variant } = item;
    return isEmpty(variant) ? '' : `(${variant.name})`;
  };

  return (
    <>
      <Overlay
        onClick={closeCard}
        closeCardOverlay={closeCardOverlay}
      />
      <CardOverlay closeCardOverlay={closeCardOverlay}>
        <CartHeader
          basketCount={shoppingCart.basketCount}
          onClose={closeCard}
        />
        <div>
          {hasItems ? (
            <>
              {stateCart.map(item => (
                <div key={item.id + item.descricao}>
                  <Item>
                    <ImageContainer onClick={() => setTimeout(() => {
                      scrollTop();
                      closeCard();
                      history.push(`/item/${item.id}/${slug(item.descricao)}`);
                      reloadPage();
                    }, 500)}
                    >
                      <ImageBox
                        url={createItemImageURL(item)}
                        shoppingCart={shoppingCart}
                        product={item}
                      />
                    </ImageContainer>
                    <Info>
                      <Description>
                        {`${item.descricao} ${createVariantText(item)}`}
                      </Description>
                      <ItemQuantity
                        onRemove={() => removeProduct(item)}
                        onAdd={() => addProduct(item)}
                        quantity={item.quantity}
                      />
                    </Info>
                    <Delete>
                      <IconDelete src={Trash} onClick={() => deleteItem(item)} />
                      <Price>{calculateItemPrice(item)}</Price>
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
                  <Value>{formatCurrency(totalCart)}</Value>
                </SubTotalTitle>
                <Finish onClick={() => {
                  setTimeout(() => {
                    scrollTop();
                    updateShoppingCart({
                      cardOverlay: false,
                    });
                    history.push(paths.cart);
                  }, 500);
                }}
                >
                  <FinishText>FINALIZAR COMPRA</FinishText>
                </Finish>

                <BuyMore onClick={() => {
                  setTimeout(() => {
                    scrollTop();
                    closeCard();
                    history.push(paths.home);
                  }, 500);
                }}
                >
                  ADICIONAR MAIS PRODUTOS
                </BuyMore>
              </span>
            </>
          ) : <EmptyCartMessage />}
        </div>
      </CardOverlay>
    </>
  );
};

CardShop.propTypes = {};

export default CardShop;
