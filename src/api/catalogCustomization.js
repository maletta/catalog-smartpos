import axios from 'axios';
import getStoreName from 'utils/getStoreName';
import defaultTheme from 'styles/defaultTheme';

export const adapterURLPayloadToTheme = payload => ({
  background: payload.screenBackground.background,
  buttons: {
    primary: {
      text: payload.buttonsAndLinks.text,
      background: payload.buttonsAndLinks.button,
    },
    secondary: {
      text: payload.buttonsAndLinks.button,
      background: payload.buttonsAndLinks.text,
    },
  },
  footer: {
    background: payload.footer.background,
    text: payload.footer.text,
  },
  header: {
    background: payload.header.background,
    text: payload.header.text,
  },
  links: {
    primary: payload.buttonsAndLinks.link,
    secondary: payload.buttonsAndLinks.button,
  },
  colorWhite: '#fff',
  colorPrimaryLight: '#ffc67c',
  colorGrayLight: '#efefef',
  colorGrayLight1: '#d7d7d7',
  colorgraylight2: '#918f8f',
  buttonPrimary: '#f28a00',
  colorSecondary: '#f28a00',
});

export const adapterPayloadToTheme = payload => ({
  background: payload.screen_background_color,
  buttons: {
    primary: {
      text: payload.text_color,
      background: payload.button_color,
    },
    secondary: {
      text: payload.button_color,
      background: payload.text_color,
    },
  },
  footer: {
    background: payload.footer_background_color,
    text: payload.footer_text_color,
  },
  header: {
    background: payload.header_background_color,
    text: payload.header_text_color,
  },
  links: {
    primary: payload.link_color,
    secondary: payload.button_color,
  },
  colorWhite: '#fff',
  colorPrimaryLight: '#ffc67c',
  colorGrayLight: '#efefef',
  colorGrayLight1: '#d7d7d7',
  colorgraylight2: '#918f8f',
  buttonPrimary: '#f28a00',
  colorSecondary: '#f28a00',
});

const hasTheme = theme => theme !== null && theme !== undefined;
const isValidPlan = plan => plan.subscribedPlan === 'PREMIUM' || plan.freeDays;

export const requestTheme = () => {
  const storeName = getStoreName();
  return axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/customizacao/${storeName}`);
};

export const getTheme = async () => {
  try {
    const { data } = await requestTheme();
    const { theme, plan } = data;
    const newTheme = hasTheme(theme) && isValidPlan(plan)
      ? adapterPayloadToTheme(theme) : defaultTheme;
    return newTheme;
  } catch {
    return defaultTheme;
  }
};

export default {};
