import React, { useContext } from "react";
import Swal from "sweetalert2";
import { injectIntl } from "react-intl";
import styled from "styled-components";

import Button from "components/Form/Button";
import Grid from "components/Grid";
import history from "utils/history";
import ShopContext from "contexts/ShopContext";
import ClosedStore from "assets/closed-store.svg";

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

  return (
    <>
      <Grid cols="12" className="d-flex justify-content-end">
        <Button
          className="d-none d-md-block"
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
