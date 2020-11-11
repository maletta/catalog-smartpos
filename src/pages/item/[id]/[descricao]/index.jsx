import React from 'react';
import PropTypes from 'prop-types';
import SingleProductTemplate, { getServerSideProps as getPropsFromSSR } from 'templates/SingleProduct';
import Head from 'components/Head';


export async function getServerSideProps(context) {
  return getPropsFromSSR(context);
}

const Page = ({ headProps }) => (
  <>
    <Head {...headProps} />
    <SingleProductTemplate />
  </>
);

Page.propTypes = {
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

export default Page;
