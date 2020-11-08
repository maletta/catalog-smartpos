import axios from 'axios';
import smartposTheme from 'styles/smartposTheme';

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
const isValidPlan = plan => plan.subscribedPlan !== 'FREE' || plan.freeDays;

const getThemeFromUrl = (url) => {
  const params = new URLSearchParams(url);
  const theme = params.has('theme') ? params.get('theme') : null;
  return theme;
};

const adapterThemeFromUrl = (themeBase64) => {
  const themeString = window.atob(themeBase64);
  const themeParsed = JSON.parse(themeString);
  const themeAdapted = adapterURLPayloadToTheme(themeParsed);
  return themeAdapted;
};

export const requestTheme = storeId => axios.get(`${process.env.NEXT_PUBLIC_MAIN_API}/v1/loja/customizacao/${storeId}`)
  .then(r => r)
  .catch(() => {
  });

export const getThemeFromApi = async (storeId) => {
  try {
    const { data } = await requestTheme(storeId);
    const { theme, plan } = data;
    const newTheme = hasTheme(theme) && isValidPlan(plan) && storeId
      ? adapterPayloadToTheme(theme) : smartposTheme;
    return newTheme;
  } catch {
    return smartposTheme;
  }
};

export const getTheme = async (storeId) => {
  const themeBase64 = getThemeFromUrl(window.location.search);
  let response = null;
  if (themeBase64) {
    response = adapterThemeFromUrl(themeBase64);
  } else {
    response = await getThemeFromApi(storeId);
  }
  return response;
};

export default {};
