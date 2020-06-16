import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import NumberFormat from "react-number-format";

import Button from "components/Form/Button";
import Input from "components/Form/Input";
// import Input from "components/Form/";
import Grid from "components/Grid";
import history from "utils/history";
import ShopContext from "contexts/ShopContext";
import ClosedStore from "assets/closed-store.svg";

const DeliveryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CouponContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const redirectToCheckout = () => history.push("/checkout");
const redirectToHome = () => history.push("/");

const showStoreIsClosedModal = shop => {
  Swal.fire({
    html: `<div>
    <div><img src="${ClosedStore}"></div>
    <span class="foradohorario-titulo"> 
    ${
      shop.today.closed
        ? "Estabelecimento fechado!"
        : `Este estabelecimento abre entre:
      ${shop.today.hours.map(
        itemHour => `<br />${itemHour.openHour} às ${itemHour.closeHour}`
      )}`
    }
    </span>
    <p class="foradohorario-texto">Você pode olhar o catálogo à vontade e fazer o pedido quando o estabelecimento estiver aberto.</p>
    </div>`,
    showConfirmButton: true,
    confirmButtonColor: "var(-color--primary)",
    showCloseButton: true,
    onClose: redirectToHome
  });
};

const verifyRedirect = shop => {
  if (shop.allowOrderOutsideBusinessHours || !shop.closeNow) {
    redirectToCheckout();
    return;
  }

  showStoreIsClosedModal(shop);
};

const CartFooter = ({ intl, totalCart, updateFilter }) => {
  const { shop } = useContext(ShopContext);
  const [delivery, setDelivery] = useState("retrieve");

  return (
    <>
      <Grid cols="12" className="d-flex justify-content-between">
        <DeliveryContainer>
          <p>Entrega:</p>
          <label>
            <input
              style={{ marginRight: "5px" }}
              type="radio"
              name="delivery"
              value="retrieve"
              checked={delivery === "retrieve"}
              onChange={({ target }) => {
                setDelivery(target.value);
              }}
            />
            {"Retirar no local"}
          </label>
          <label>
            <input
              style={{ marginRight: "5px" }}
              type="radio"
              name="delivery"
              value="shipping-fee"
              checked={delivery === "shipping-fee"}
              onChange={({ target }) => {
                setDelivery(target.value);
              }}
            />
            {"Calcular frete"}
          </label>
          {delivery === "shipping-fee" && (
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div>
                <NumberFormat
                  label=""
                  name="cep"
                  inputId="cep"
                  type="tel"
                  format="#####-###"
                  placeholder="Informe seu CEP"
                  customInput={Input}
                />
              </div>
              <Button
                styleType="tertiary"
                value="Calcular"
                onClick={() => {}}
              />
            </div>
          )}
        </DeliveryContainer>
        <CouponContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <Input label="Cupom de desconto:" />
            </div>
            <Button styleType="tertiary" value="Aplicar" onClick={() => {}} />
          </div>
        </CouponContainer>
      </Grid>
      <Grid cols="12" className="d-flex justify-content-end mb-4 pt-5">
        <Button
          className="d-none d-md-block mr-3"
          value="Adicionar mais itens"
          type="submit"
          styleType="secondary"
          onClick={() => {
            updateFilter({
              categoria: 0,
              label: "Todas as categorias",
              page: 1,
              search: "",
              categoryName: ""
            });
            redirectToHome();
          }}
        />
        <Button value="Finalizar pedido" onClick={() => verifyRedirect(shop)} />
      </Grid>
    </>
  );
};

export default injectIntl(CartFooter);
