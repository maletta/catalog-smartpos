import React, { useEffect, useState, useContext } from 'react';
import lodash from 'lodash';

import Grid from 'components/Grid';
import Steps from 'components/Steps';

import FilterContext from 'contexts/FilterContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

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

  const deleteItem = (uuid) => {
    const newCart = stateCart.filter(item => item.uuid !== uuid);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setStateCart(newCart);
  };

  const updateAmount = (quantity, itemIndex) => {
    const updateAmountCart = lodash.cloneDeep(stateCart);
    updateAmountCart[itemIndex].quantity = quantity;
    const basketCount = updateAmountCart.reduce((count, val) => count + val.quantity, 0);

    localStorage.setItem('cart', JSON.stringify(updateAmountCart));
    setStateCart(updateAmountCart);
    updateShoppingCart({ cart: updateAmountCart, basketCount });
  };

  useEffect(() => {
    const total = stateCart.reduce(
      (count, val) => count + val.quantity * (val.pricing.modifiers + val.pricing.product),
      0,
    );
    const basketCount = stateCart.reduce(
      (count, val) => count + val.quantity,
      0,
    );

    updateFilter({
      categoria: 0,
      label: 'Carrinho',
      page: 1,
      search: '',
    });
    updateShoppingCart({ basketCount });

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setStateCart(cart);
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
          deleteItem={deleteItem}
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
