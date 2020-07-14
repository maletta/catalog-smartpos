import React, { useEffect, useState, useContext } from 'react';
import lodash from 'lodash';

import Grid from 'components/Grid';
import Steps from 'components/Steps';

import FilterContext from 'contexts/FilterContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

import storage from './storage';

import EmptyCart from './components/EmptyCart';
import CartFooter from './components/CartFooter';
import PurchasePrices from './components/PurchasePrices';
import CartContainer from './components/CartContainer';
import ItemsContainer from './components/ItemsContainer';

const Cart = () => {
  const { updateFilter } = useContext(FilterContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);

  const [stateCart, setStateCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [basketCountCart, setBasketCountCart] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState({});

  const sumCartQuantity = cartItems => cartItems.reduce((total, item) => total + item.quantity, 0);
  const sumCartTotalPrice = cartItems => cartItems.reduce(
    (total, item) => total + item.quantity * (item.pricing.modifiers + item.pricing.product),
    0,
  );

  const removeItemFromCart = (uuid) => {
    const newCart = stateCart.filter(item => item.uuid !== uuid);
    storage.updateLocalCart(newCart);
    setStateCart(newCart);
  };

  const updateAmount = (quantity, itemIndex) => {
    const stateCartClone = lodash.cloneDeep(stateCart);
    stateCartClone[itemIndex].quantity = quantity;
    const basketCount = sumCartQuantity(stateCartClone);

    storage.updateLocalCart(stateCartClone);
    setStateCart(stateCartClone);
    updateShoppingCart({ cart: stateCartClone, basketCount });
  };

  useEffect(() => {
    updateFilter({
      categoria: 0,
      label: 'Carrinho',
      page: 1,
      search: '',
    });
  }, []);

  useEffect(() => {
    const total = sumCartTotalPrice(stateCart);
    const basketCount = sumCartQuantity(stateCart);

    updateShoppingCart({ basketCount });

    setStateCart(storage.getLocalCart());
    setTotalCart(total);
    setBasketCountCart(basketCount);
  }, [stateCart.length]);

  const hasItems = stateCart.length > 0;

  return (
    <CartContainer className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <Steps activeIndex={0} />
        <ItemsContainer
          cartItems={stateCart}
          deleteItem={removeItemFromCart}
          updateAmount={updateAmount}
        />
        {hasItems ? (
          <CartFooter
            totalCart={totalCart}
            updateFilter={updateFilter}
            deliveryCost={deliveryCost}
            setDeliveryCost={setDeliveryCost}
          />
        ) : <EmptyCart />}
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          basketCountCart={basketCountCart}
          totalCart={totalCart}
          deliveryCost={deliveryCost}
          couponValue={0}
        />
      </Grid>
    </CartContainer>
  );
};

export default Cart;
