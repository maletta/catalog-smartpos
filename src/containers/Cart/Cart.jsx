import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import lodash from "lodash";

import CartItem from "components/CartItem";
import Grid from "components/Grid";
import Steps from "components/Steps";

import FilterContext from "contexts/FilterContext";
import ShoppingCartContext from "contexts/ShoppingCartContext";

import EmptyCart from "./components/EmptyCart";
import CartFooter from "./components/CartFooter";
import PurchasePrices from "./components/PurchasePrices";

const Container = styled.div`
  background: #fff;
  padding-right: 0;
`;

const StepsContainer = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  color: #212121;
  font-size: 24px;
`;

const ItemsContainer = styled.div`
  padding-left: 20px;
`;

const Cart = () => {
  const { updateFilter } = useContext(FilterContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);

  const [stateCart, setStateCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [basketCountCart, setBasketCountCart] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState({});

  const deleteItem = uuid => {
    const newCart = stateCart.filter(item => item.uuid !== uuid);
    setStateCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateAmount = (quantity, itemIndex) => {
    const updateAmountCart = lodash.cloneDeep(stateCart);
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
    setBasketCountCart(basketCount);
  }, [stateCart.length]);

  const hasItems = stateCart.length > 0;
  const dontHaveItems = !hasItems;

  return (
    <Container className="row">
      <Grid cols="12 12 12 8 8" className="pt-3">
        <StepsContainer>
          <Steps activeIndex={0} />
        </StepsContainer>
        <ItemsContainer>
          <Title>Resumo do pedido</Title>
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
        </ItemsContainer>
        {dontHaveItems && <EmptyCart />}
        {hasItems && (
          <CartFooter
            totalCart={totalCart}
            updateFilter={updateFilter}
            deliveryCost={deliveryCost}
            setDeliveryCost={setDeliveryCost}
          />
        )}
      </Grid>
      <Grid cols="12 12 12 4 4" style={{ padding: 0 }}>
        <PurchasePrices
          basketCountCart={basketCountCart}
          totalCart={totalCart}
          deliveryCost={deliveryCost}
          couponValue={-5}
        />
      </Grid>
    </Container>
  );
};

export default Cart;
