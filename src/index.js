import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'styles/DefaultTheme';
import * as serviceWorker from './serviceWorker';
import App from './App';

import 'styles/index.scss';

ReactDOM.render((
  <ThemeProvider theme={defaultTheme}>
    <App />
  </ThemeProvider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
