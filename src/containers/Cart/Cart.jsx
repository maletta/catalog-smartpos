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

  const [stateCart, setStateCart] = useState([]);
  const [deliveryCost, setDeliveryCost] = useState({});

  const totalCart = utilsCart.sumCartTotalPrice(stateCart);

  useEffect(() => {
    updateFilter({
      categoria: 0,
      label: 'Carrinho',
      page: 1,
      search: '',
    });

    const localCart = storage.getLocalCart();
    const localTotalCart = utilsCart.sumCartTotalPrice(localCart);
    const basketCount = utilsCart.sumCartQuantity(localCart);
    setStateCart(localCart);
    updateShoppingCart({ cart: localCart, basketCount, totalCart: localTotalCart });
  }, []);

  const removeItemFromCart = (uuid) => {
    const newCart = stateCart.filter(item => item.uuid !== uuid);
    storage.updateLocalCart(newCart);
    setStateCart(newCart);
  };

  const updateCartPrice = (quantity, itemIndex) => {
    const stateCartClone = lodash.cloneDeep(stateCart);
    stateCartClone[itemIndex].quantity = quantity;
    const basketCount = utilsCart.sumCartQuantity(stateCartClone);

    storage.updateLocalCart(stateCartClone);
    setStateCart(stateCartClone);
    updateShoppingCart({
      cart: stateCartClone,
      basketCount,
      cardOverlay: false,
    });
  };

  const hasItems = stateCart.length > 0;

  return (
    <CartContainer className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <Steps activeIndex={0} />
        <ItemsContainer
          cartItems={stateCart}
          deleteItem={removeItemFromCart}
          updateAmount={updateCartPrice}
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
