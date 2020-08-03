import React, { useEffect, useState, useContext } from 'react';
import lodash from 'lodash';

import Grid from 'components/Grid';
import Steps from 'components/Steps';
import utilsCart from 'utils/cart';
import storage from 'utils/storage';

import FilterContext from 'contexts/FilterContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

import EmptyCart from './components/EmptyCart';
import CartFooter from './components/CartFooter';
import PurchasePrices from './components/PurchasePrices';
import CartContainer from './components/CartContainer';
import ItemsContainer from './components/ItemsContainer';

const Cart = () => {
  const { updateFilter } = useContext(FilterContext);
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);

  // const [stateCart, setStateCart] = useState([]);
  const [deliveryCost, setDeliveryCost] = useState({});

  useEffect(() => {
    updateFilter({
      categoria: 0,
      label: 'Carrinho',
      page: 1,
      search: '',
    });

    const localCart = storage.getLocalCart();
    // setStateCart(localCart);

    updateShoppingCart({
      cardOverlay: false,
      cart: localCart,
      basketCount: utilsCart.sumCartQuantity(localCart),
      totalCart: utilsCart.sumCartTotalPrice(localCart),
    });
  }, []);

  const removeItemFromCart = (uuid) => {
    // const newCart = stateCart.filter(item => item.uuid !== uuid);
    const newCart = shoppingCart.cart.filter(item => item.uuid !== uuid);

    storage.updateLocalCart(newCart);
    // setStateCart(newCart);

    updateShoppingCart({
      cart: newCart,
      basketCount: utilsCart.sumCartQuantity(newCart),
      totalCart: utilsCart.sumCartTotalPrice(newCart),
      cardOverlay: false,
    });
  };

  const updateItemQuantity = (quantity, itemIndex) => {
    // const stateCartClone = lodash.cloneDeep(stateCart);
    const stateCartClone = lodash.cloneDeep(shoppingCart.cart);
    stateCartClone[itemIndex].quantity = quantity;

    storage.updateLocalCart(stateCartClone);
    // setStateCart(stateCartClone);

    updateShoppingCart({
      cart: stateCartClone,
      basketCount: utilsCart.sumCartQuantity(stateCartClone),
      totalCart: utilsCart.sumCartTotalPrice(stateCartClone),
      cardOverlay: false,
    });
  };

  // const hasItems = stateCart.length > 0;
  const hasItems = shoppingCart.cart.length > 0;

  return (
    <CartContainer className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <Steps activeIndex={0} />
        <ItemsContainer
          // cartItems={stateCart}
          cartItems={shoppingCart.cart}
          deleteItem={removeItemFromCart}
          updateAmount={updateItemQuantity}
        />
        {hasItems ? (
          <CartFooter
            updateFilter={updateFilter}
            deliveryCost={deliveryCost}
            setDeliveryCost={setDeliveryCost}
          />
        ) : <EmptyCart />}
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          basketCountCart={shoppingCart.basketCount}
          totalCart={shoppingCart.totalCart}
          deliveryCost={shoppingCart.deliveryFee}
          couponValue={0}
        />
      </Grid>
    </CartContainer>
  );
};

export default Cart;
