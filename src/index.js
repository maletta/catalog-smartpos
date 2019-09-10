import 'babel-polyfill';
import 'url-search-params-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import IntlProvider from 'intl/intlProvider';
import defaultTheme from 'styles/DefaultTheme';
import dynamicManifest from 'dynamicManifest';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { FilterProvider } from './contexts/FilterContext';
import { ShopProvider } from './contexts/ShopContext';


import 'styles/index.scss';

ReactDOM.render((
  <IntlProvider language={{ locale: 'pt', messages: {} }}>
    <ThemeProvider theme={defaultTheme}>
      <ShopProvider>
        <FilterProvider>
          {dynamicManifest()}
          <App />
        </FilterProvider>
      </ShopProvider>
    </ThemeProvider>
  </IntlProvider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
