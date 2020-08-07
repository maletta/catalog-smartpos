import formatCurrency from 'utils/formatCurrency';

import { redirectToRegisterData } from './cartFooterRouter';
import { showStoreIsClosedModal } from './cartFooterModal';

export const shouldRedirectToNextStep = (shop) => {
  const isShopOpen = shop.allowOrderOutsideBusinessHours || !shop.closeNow;
  if (isShopOpen) {
    redirectToRegisterData();
  } else {
    showStoreIsClosedModal(shop);
  }
};

const createDeliveryCostText = cost => `O frete custa ${formatCurrency(cost)}`;

export const createText = (deliveryCost) => {
  const { isDeliverable, cost } = deliveryCost;
  return isDeliverable ? createDeliveryCostText(cost) : 'Não entrega na sua região';
};

export default {};
