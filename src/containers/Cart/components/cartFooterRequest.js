import axios from 'axios';

const mainAPIPath = process.env.REACT_APP_MAIN_API;
const getRequest = axios.get;

export const checkingDelivery = (locationCustomer, storeID) => getRequest(
  `${mainAPIPath}/v1/loja/${storeID}/frete/${locationCustomer}`,
);

export const checkingCoupon = (couponName, storeID) => getRequest(
  `${mainAPIPath}/v1/loja/${storeID}/cupom/${couponName}`,
);

export const checkingForOpenCoupons = storeID => getRequest(
  `${mainAPIPath}/v1/loja/${storeID}/cuponsAbertos/`,
);

export default {};
