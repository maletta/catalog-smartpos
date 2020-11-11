import React from 'react';
import PropTypes from 'prop-types';
import HomeTemplate, { getServerSideProps as getPropsFromSSR } from 'templates/Home';
import Head from 'components/Head';

export async function getServerSideProps(context) {
  return getPropsFromSSR(context);
}

const Index = ({ headProps }) => (
  <>
    <Head {...headProps} />
    <HomeTemplate />
  </>
);

Index.propTypes = {
  headProps: PropTypes.shape({
    description: PropTypes.string.isRequired,
    imageWidth: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Index;
