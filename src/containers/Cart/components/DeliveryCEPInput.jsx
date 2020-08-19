import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';

import Input from 'components/Form/Input';
import Button from 'components/Form/Button';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import ShopContext from 'contexts/ShopContext';

import { CEPContainer } from './cartFooterStyled';
import { checkingDelivery } from './cartFooterRequest';
import { createText } from './cartFooterUtils';

const removeDash = value => value.replace('-', '').trim();

const DeliveryCEPInput = () => {
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);
  const { shop } = useContext(ShopContext);

  const [cep, setCEP] = useState('');
  const [flagDelivery, setFlagDelivery] = useState(false);
  const [loadingDeliveryCost, setLoadingDeliveryCost] = useState(false);

  const deliveryCostText = createText(shoppingCart.deliveryFee);
  const deliveryText = flagDelivery ? deliveryCostText : '';

  const calculateDeliveryCost = async () => {
    if (cep.length < 8) return;

    setLoadingDeliveryCost(true);

    const { data } = await checkingDelivery(cep, shop.id);

    updateShoppingCart({ deliveryFee: data });
    setFlagDelivery(true);
    setLoadingDeliveryCost(false);
  };

  const handleChangeCEP = ({ target }) => {
    const cepNumbers = removeDash(target.value);
    setCEP(cepNumbers);
    updateShoppingCart({ cep: cepNumbers });
  };

  return (
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
  );
};

export default DeliveryCEPInput;
