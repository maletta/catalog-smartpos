import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'styles/DefaultTheme';
import dynamicManifest from 'dynamicManifest';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ShopProvider } from './contexts/ShopContext';
import { FilterProvider } from './contexts/FilterContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/index.css';

ReactDOM.render((
  <ThemeProvider theme={defaultTheme}>
    <ShopProvider>
      <FilterProvider>
        <ShoppingCartProvider>
          {dynamicManifest()}
          <App />
        </ShoppingCartProvider>
      </FilterProvider>
    </ShopProvider>
  </ThemeProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
