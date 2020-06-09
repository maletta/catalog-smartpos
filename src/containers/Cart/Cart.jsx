import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import _ from "lodash";

import CartItem from "components/CartItem";
import Grid from "components/Grid";

import FilterContext from "contexts/FilterContext";
import ShoppingCartContext from "contexts/ShoppingCartContext";

import EmptyCart from "./components/EmptyCart";
import CartFooter from "./components/CartFooter";

const Container = styled.div`
  background: #fff;
  border-radius: 5px;
  padding-bottom: 15px;
`;

const Cart = () => {
  const { updateFilter } = useContext(FilterContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);

  const [stateCart, setStateCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  const deleteItem = uuid => {
    const newCart = stateCart.filter(item => item.uuid !== uuid);
    setStateCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateAmount = (quantity, itemIndex) => {
    const updateAmountCart = _.cloneDeep(stateCart);
    updateAmountCart[itemIndex].quantity = quantity;

    setStateCart(updateAmountCart);
    localStorage.setItem("cart", JSON.stringify(updateAmountCart));
  };

  useEffect(() => {
    const total = stateCart.reduce(
      (count, val) =>
        count + val.quantity * (val.pricing.modifiers + val.pricing.product),
      0
    );
    const basketCount = stateCart.reduce(
      (count, val) => count + val.quantity,
      0
    );

    updateFilter({
      categoria: 0,
      label: "Carrinho",
      page: 1,
      search: ""
    });
    updateShoppingCart({ basketCount });

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setStateCart(cart);
    setTotalCart(total);
  }, [stateCart.length]);

  const hasItems = stateCart.length > 0;
  const dontHaveItems = !hasItems

  return (
    <Container className="row">
      <Grid cols="12 12 12 12 12">
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
        {dontHaveItems && <EmptyCart />}
      </Grid>
      {hasItems && (
        <CartFooter totalCart={totalCart} updateFilter={updateFilter} />
      )}
    </Container>
  );
};

export default Cart;
