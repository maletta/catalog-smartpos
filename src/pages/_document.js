import React from 'react';
import Document, {
  Head, Main, NextScript, Html,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <link rel="manifest" id="manifest" />
          <meta charset="utf-8" />
          <link rel="shortcut icon" id="icon" href="%PUBLIC_URL%/favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
            integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
            crossOrigin="anonymous"
          />
          <script type="text/javascript"
          src="https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js" />
          <meta name="theme-color" content="#f37c05" />
          <title>Catálogo de produtos</title>
          <meta property="og:title" content="Catálogo de produtos" />
          <meta property="og:description"
            content="Acesse e conheça nosso catálogo de produtos on-line" />
          <meta property="og:site_name" content="Catálogo" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/catalogo-share.jpg" />
          <meta property="og:image:secure_url" content="/images/catalogo-share.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="627" /> */}
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous" />
          <script type="text/javascript" src="https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
