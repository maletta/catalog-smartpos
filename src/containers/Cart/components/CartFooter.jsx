import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from 'components/Form/Button';
import Input from 'components/Form/Input';
import Grid from 'components/Grid';
import history from 'utils/history';
import ShopContext from 'contexts/ShopContext';
import ClosedStore from 'assets/closed-store.svg';
import ShoppingCartContext from 'contexts/ShoppingCartContext';

const checkingDelivery = (locationCustomer, storeID) => axios.get(
  `${process.env.REACT_APP_MAIN_API}/v1/loja/${storeID}/frete/${locationCustomer}`,
);

const DeliveryContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const CouponContainer = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const CEPContainer = styled.div`
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const CouponInputContainer = styled.div`
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const redirectToRegisterData = () => history.push('/dados-cadastrais');
const redirectToHome = () => history.push('/');

const showStoreIsClosedModal = (shop) => {
  const shopHoursOpen = shop.today.hours.map(
    itemHour => `<br />${itemHour.openHour} às ${itemHour.closeHour}`,
  );

  const isShopClosed = shop.today.closed;
  const title = isShopClosed
    ? 'Estabelecimento fechado!'
    : `Este estabelecimento abre entre: ${shopHoursOpen}`;

  Swal.fire({
    html: `<div>
    <div><img src="${ClosedStore}"></div>
    <span class="foradohorario-titulo"> 
    ${title}
    </span>
    <p class="foradohorario-texto">Você pode olhar o catálogo à vontade e fazer o pedido quando o estabelecimento estiver aberto.</p>
    </div>`,
    showConfirmButton: true,
    confirmButtonColor: 'var(-color--primary)',
    showCloseButton: true,
    onClose: redirectToHome,
  });
};

const verifyRedirect = (shop) => {
  if (shop.allowOrderOutsideBusinessHours || !shop.closeNow) {
    redirectToRegisterData();
    return;
  }

  showStoreIsClosedModal(shop);
};

const CartFooter = ({
  intl, updateFilter, deliveryCost, setDeliveryCost,
}) => {
  const { shop } = useContext(ShopContext);
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const [delivery, setDelivery] = useState('retrieve');
  const [cep, setCEP] = useState('');
  const [loadingDeliveryCost, setLoadingDeliveryCost] = useState(false);
  const [flagDelivery, setFlagDelivery] = useState(false);

  const formatCurrency = price => intl.formatNumber(price, {
    style: 'currency',
    currency: 'BRL',
  });

  const deliveryFeeText = deliveryCost.isDeliverable
    ? `O frete custa ${formatCurrency(deliveryCost.cost)}`
    : 'Não entrega na sua região';

  const deliveryText = (
    flagDelivery ? deliveryFeeText : ''
  );

  const isNotDeliverable = delivery === 'retrieve' ? false : !deliveryCost.isDeliverable;

  return (
    <>
      <Grid cols="12" className="d-flex justify-content-between flex-wrap">
        <DeliveryContainer>
          <p>Entrega:</p>
          <label htmlFor="retirada">
            <input
              id="retirada"
              style={{ marginRight: '5px' }}
              type="radio"
              name="delivery"
              value="retrieve"
              checked={delivery === 'retrieve'}
              onChange={({ target }) => {
                setDelivery(target.value);
                updateShoppingCart({ withdraw: true });
              }}
            />
            Retirar no local
          </label>
          <label htmlFor="entrega">
            <input
              id="entrega"
              style={{ marginRight: '5px' }}
              type="radio"
              name="delivery"
              value="shipping-fee"
              checked={delivery === 'shipping-fee'}
              onChange={({ target }) => {
                setDelivery(target.value);
                updateShoppingCart({ withdraw: false });
              }}
            />
            Calcular frete
          </label>
          {delivery === 'shipping-fee' && (
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <CEPContainer>
                <NumberFormat
                  label=""
                  name="cep"
                  inputId="cep"
                  type="tel"
                  format="#####-###"
                  placeholder="Informe seu CEP"
                  customInput={Input}
                  onChange={({ target }) => {
                    const cepWithoutDash = target.value.replace('-', '');
                    const cepWithoutWhiteSpace = cepWithoutDash.trim();
                    setCEP(cepWithoutWhiteSpace);
                    updateShoppingCart({ cep: cepWithoutWhiteSpace });
                  }}
                />
                {deliveryText}
              </CEPContainer>
              <Button
                styleType="tertiary"
                value="Calcular"
                isLoading={loadingDeliveryCost}
                onClick={async () => {
                  setLoadingDeliveryCost(true);

                  const response = await checkingDelivery(cep, shop.id);

                  setDeliveryCost(response.data);
                  updateShoppingCart({ deliveryFee: response.data });
                  setLoadingDeliveryCost(false);
                  setFlagDelivery(true);
                }}
              />
            </div>
          )}
        </DeliveryContainer>
        {/* Precisa esperar a API do cupom ficar pronta */}
        {process.env.NODE_ENV === 'development' && (
          <CouponContainer>
            <div
              style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              <CouponInputContainer>
                <Input label="Cupom de desconto:" />
              </CouponInputContainer>
              <Button styleType="tertiary" value="Aplicar" onClick={() => { }} />
            </div>
          </CouponContainer>
        )}
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
              label: 'Todas as categorias',
              page: 1,
              search: '',
              categoryName: '',
            });
            redirectToHome();
          }}
        />
        <Button
          value="Próximo"
          onClick={() => verifyRedirect(shop)}
          disabled={isNotDeliverable}
        />
      </Grid>
    </>
  );
};

CartFooter.propTypes = {
  intl: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  deliveryCost: PropTypes.object.isRequired,
  setDeliveryCost: PropTypes.func.isRequired,
};

export default injectIntl(CartFooter);
