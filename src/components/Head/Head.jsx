import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({
  description,
  imageWidth,
  imageHeight,
  imageUrl,
  siteName,
  siteUrl,
  title,
}) => (
  <>
    <NextHead>
      <meta property="og:site_name" content={`${siteName}`} />
      <meta property="og:url" content={`${siteUrl}`} />
      <meta name="og:title" property="og:title" content={`${title}`} />
      <meta property="og:type" content="website" />
      <meta name="description" content={description} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta
        property="og:image:alt"
        content="uma imagem do produto compartilhado"
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title}`} />
      <meta name="twitter:text:title" content={`${title}`} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={`${siteUrl}`} />
      <meta name="viewport" content="width=device-width, initial-scale1" />
      <meta charSet="utf-8" />
      <title>{siteName}</title>
    </NextHead>
  </>
);


Head.propTypes = {
  description: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Head;
