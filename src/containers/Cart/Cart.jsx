import React, { useEffect, useContext } from 'react';
import lodash from 'lodash';

import history from 'utils/history';
import paths from 'paths';

import Grid from 'components/Grid';
import Steps from 'components/Steps';

import FilterContext from 'contexts/FilterContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ShopContext from 'contexts/ShopContext';

import EmptyCart from './components/EmptyCart';
import CartFooter from './components/CartFooter';
import PurchasePrices from './components/PurchasePrices';
import CartContainer from './components/CartContainer';
import ItemsContainer from './components/ItemsContainer';

const Cart = () => {
  const { updateFilter } = useContext(FilterContext);
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  useEffect(() => {
    updateFilter({
      categoria: 0,
      label: 'Carrinho',
      page: 1,
      search: '',
    });

    if (shop.is_enableOrder === 0) {
      history.push(paths.home);
    }
  }, []);

  const removeItemFromCart = (uuid) => {
    const cart = shoppingCart.cart.filter(item => item.uuid !== uuid);
    updateShoppingCart({ cart });
  };

  const updateItemQuantity = (quantity, itemIndex) => {
    const cart = lodash.cloneDeep(shoppingCart.cart);
    cart[itemIndex].quantity = quantity;

    updateShoppingCart({ cart });
  };

  return (
    <CartContainer className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <Steps activeIndex={0} />
        <ItemsContainer
          cartItems={shoppingCart.cart}
          deleteItem={removeItemFromCart}
          updateAmount={updateItemQuantity}
        />
        {shoppingCart.hasItems ? <CartFooter /> : <EmptyCart />}
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
