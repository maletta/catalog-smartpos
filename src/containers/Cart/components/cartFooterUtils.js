import paths from 'paths';
import formatCurrency from 'utils/formatCurrency';

import { showStoreIsClosedModal } from './cartFooterModal';

export const shouldRedirectToNextStep = (shop, router) => {
  if (shop.customerCanOrder) {
    router.push(paths.registerData);
  } else {
    showStoreIsClosedModal(shop, router);
  }
};

const createDeliveryCostText = cost => `O frete custa ${formatCurrency(cost)}`;

export const createText = (deliveryCost) => {
  const { isDeliverable, cost } = deliveryCost;
  return isDeliverable ? createDeliveryCostText(cost) : 'Não entrega na sua região';
};

export default {};
