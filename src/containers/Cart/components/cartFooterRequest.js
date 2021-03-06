import axios from 'axios';

const mainAPIPath = process.env.NEXT_PUBLIC_MAIN_API;
const getRequest = axios.get;

export const checkingDelivery = (locationCustomer, storeID) => getRequest(
  `${mainAPIPath}/v1/loja/${storeID}/frete/${locationCustomer}`,
);

export const checkingCoupon = (couponName, storeID) => getRequest(
  `${mainAPIPath}/v1/loja/${storeID}/cupom/${couponName}`,
);

export const checkingCouponsAvailable = storeID => getRequest(
  `${mainAPIPath}/v1/loja/${storeID}/cupons/available`,
);

export default {};
