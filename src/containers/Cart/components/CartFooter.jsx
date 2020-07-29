import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import Button from 'components/Form/Button';
import Input from 'components/Form/Input';
import Grid from 'components/Grid';
import formatCurrency from 'utils/formatCurrency';
import ShopContext from 'contexts/ShopContext';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import RadioButton from 'components/RadioGroup/RadioButton';

import { checkingDelivery } from './cartFooterRequest';
import { redirectToHome, redirectToRegisterData } from './cartFooterRouter';
import { CEPContainer, DeliveryContainer } from './cartFooterStyled';
import { showStoreIsClosedModal } from './cartFooterModal';

const verifyRedirect = (shop) => {
  const isShopOpen = shop.allowOrderOutsideBusinessHours || !shop.closeNow;
  if (isShopOpen) {
    redirectToRegisterData();
  } else {
    showStoreIsClosedModal(shop);
  }
};

const CartFooter = ({
  updateFilter, deliveryCost, setDeliveryCost,
}) => {
  const { updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  const isOnlyPickup = shop.deliveryMode === 'PICKUP';
  const isOnlyDelivery = shop.deliveryMode === 'DELIVERY';
  const deliveryType = shop.deliveryMode === 'BOTH' ? 'PICKUP' : shop.deliveryMode;
  const [delivery, setDelivery] = useState(deliveryType);

  const [cep, setCEP] = useState('');
  const [loadingDeliveryCost, setLoadingDeliveryCost] = useState(false);
  const [flagDelivery, setFlagDelivery] = useState(false);

  const deliveryFeeText = deliveryCost.isDeliverable
    ? `O frete custa ${formatCurrency(deliveryCost.cost)}`
    : 'Não entrega na sua região';

  const deliveryText = flagDelivery ? deliveryFeeText : '';
  const isNotDeliverable = delivery === 'PICKUP' ? false : !deliveryCost.isDeliverable;

  const calculateDeliveryCost = async () => {
    setLoadingDeliveryCost(true);

    const { data } = await checkingDelivery(cep, shop.id);

    updateShoppingCart({ deliveryFee: data });
    setDeliveryCost(data);
    setFlagDelivery(true);
    setLoadingDeliveryCost(false);
  };

  const handleClickAddMoreItems = () => {
    updateFilter({
      categoria: 0,
      label: 'Todas as categorias',
      page: 1,
      search: '',
      categoryName: '',
    });
    redirectToHome();
  };

  const handleChangeCEP = ({ target }) => {
    const cepNumbers = target.value.replace('-', '').trim();
    setCEP(cepNumbers);
    updateShoppingCart({ cep: cepNumbers });
  };

  const handleChangeDeliveryFee = ({ target }) => {
    setDelivery(target.value);
    updateShoppingCart({ withdraw: false });
  };

  const handleChangeRetrieve = ({ target }) => {
    setDelivery(target.value);
    updateShoppingCart({ withdraw: true, deliveryFee: { cost: 0 } });
    setDeliveryCost({});
  };

  return (
    <>
      <Grid cols="12" className="d-flex justify-content-between flex-wrap">
        <DeliveryContainer>
          <p>Entrega:</p>
          {!isOnlyDelivery && (
            <RadioButton
              name="delivery"
              label="Retirar no local"
              value="PICKUP"
              checked={delivery === 'PICKUP'}
              onChange={handleChangeRetrieve}
            />
          )}
          {!isOnlyPickup && (
            <RadioButton
              name="delivery"
              label="Calcular frete"
              value="DELIVERY"
              checked={delivery === 'DELIVERY'}
              onChange={handleChangeDeliveryFee}
            />
          )}
          {delivery === 'DELIVERY' && (
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
                  onChange={handleChangeCEP}
                />
                {deliveryText}
              </CEPContainer>
              <Button
                styleType="tertiary"
                value="Calcular"
                isLoading={loadingDeliveryCost}
                onClick={calculateDeliveryCost}
              />
            </div>
          )}
        </DeliveryContainer>
      </Grid>
      <Grid cols="12" className="d-flex justify-content-end mb-4 pt-5">
        <Button
          className="d-none d-md-block mr-3"
          value="Adicionar mais itens"
          type="submit"
          styleType="secondary"
          onClick={handleClickAddMoreItems}
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
  updateFilter: PropTypes.func.isRequired,
  deliveryCost: PropTypes.object.isRequired,
  setDeliveryCost: PropTypes.func.isRequired,
};

export default CartFooter;
