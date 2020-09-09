import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import paths from 'paths';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import history from 'utils/history';
import slug from 'utils/slug';
import formatCurrency from 'utils/formatCurrency';
import Trash from 'assets/trash.svg';

import ImageBox from './components/Image';
import EmptyCartMessage from './components/EmptyCartMessage';
import CartHeader from './components/CartHeader';
import ItemQuantity from './components/ItemQuantity';
import { BuyMore } from './components/BuyMore';

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
      background-color: var(--button-primary-background);
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
  color: var(--header-background);
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
  background-color: var(--button-primary-background);
  color: var(--button-primary-text);
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
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);

  const closeCard = () => {
    updateShoppingCart({ cardOverlay: false });
  };

  const deleteItem = (uuid) => {
    const cart = shoppingCart.cart.filter(item => item.uuid !== uuid);
    updateShoppingCart({ cart });
  };

  const updateQuantity = (newQuantity, itemIndex) => {
    const cart = lodash.cloneDeep(shoppingCart.cart);
    cart[itemIndex].quantity = newQuantity;

    updateShoppingCart({ cart });
  };

  const increaseQuantity = ({ quantity }, itemIndex) => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity, itemIndex);
  };

  const decreaseQuantity = ({ quantity }, itemIndex) => {
    const newQuantity = quantity - 1;
    if (newQuantity === 0) return;
    updateQuantity(newQuantity, itemIndex);
  };

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

  const createVariantText = variant => (lodash.isEmpty(variant) ? '' : `(${variant.name})`);

  const handleClickImage = (item) => {
    const { id, descricao } = item;

    setTimeout(() => {
      scrollTop();
      closeCard();
      history.push(`/item/${id}/${slug(descricao)}`);
      reloadPage();
    }, 500);
  };

  const handleClickFinish = () => {
    setTimeout(() => {
      scrollTop();
      updateShoppingCart({ cardOverlay: false });
      history.push(paths.cart);
    }, 500);
  };

  const handleClickBuy = () => {
    setTimeout(() => {
      scrollTop();
      closeCard();
      history.push(paths.home);
    }, 500);
  };

  const ItemImage = ({ item }) => (
    <ImageContainer onClick={() => handleClickImage(item)}>
      <ImageBox
        url={createItemImageURL(item)}
        shoppingCart={shoppingCart}
        product={item}
      />
    </ImageContainer>
  );

  ItemImage.propTypes = {
    item: PropTypes.any.isRequired,
  };

  const ItemInfo = ({ item, itemIndex }) => (
    <Info>
      <Description>
        {`${item.descricao} ${createVariantText(item.variant)}`}
      </Description>
      <ItemQuantity
        onRemove={() => decreaseQuantity(item, itemIndex)}
        onAdd={() => increaseQuantity(item, itemIndex)}
        quantity={item.quantity}
      />
    </Info>
  );

  ItemInfo.propTypes = {
    item: PropTypes.any.isRequired,
    itemIndex: PropTypes.number.isRequired,
  };

  const ItemDelete = ({ item }) => (
    <Delete>
      <IconDelete src={Trash} onClick={() => deleteItem(item.uuid)} />
      <Price>{calculateItemPrice(item)}</Price>
    </Delete>
  );

  ItemDelete.propTypes = {
    item: PropTypes.any.isRequired,
  };

  const OrderSummary = () => (
    <span>
      <TotalTitle>Resumo do pedido</TotalTitle>
      <SubTotalTitle>
        <TextTotal>SubTotal: </TextTotal>
        <Value>{formatCurrency(shoppingCart.totalCart)}</Value>
      </SubTotalTitle>
      <Finish onClick={handleClickFinish}>
        <FinishText>FINALIZAR COMPRA</FinishText>
      </Finish>
      <BuyMore onClick={handleClickBuy}>ADICIONAR MAIS PRODUTOS</BuyMore>
    </span>
  );

  const ItemCard = ({ item, itemIndex }) => (
    <div>
      <Item>
        <ItemImage item={item} />
        <ItemInfo item={item} itemIndex={itemIndex} />
        <ItemDelete item={item} />
      </Item>
      <hr />
    </div>
  );

  ItemCard.propTypes = {
    item: PropTypes.any.isRequired,
    itemIndex: PropTypes.number.isRequired,
  };

  const cartItems = shoppingCart.cart.map((item, i) => (
    <ItemCard key={item.id + item.descricao} item={item} itemIndex={i} />
  ));

  const CartBody = () => {
    if (shoppingCart.hasItems) {
      return (
        <>
          {cartItems}
          <OrderSummary />
        </>
      );
    }

    return <EmptyCartMessage />;
  };

  return (
    <>
      <Overlay
        onClick={closeCard}
        closeCardOverlay={shoppingCart.cardOverlay}
      />
      <CardOverlay closeCardOverlay={shoppingCart.cardOverlay}>
        <CartHeader
          basketCount={shoppingCart.basketCount}
          onClose={closeCard}
        />
        <CartBody />
      </CardOverlay>
    </>
  );
};

CardShop.propTypes = {};

export default CardShop;
