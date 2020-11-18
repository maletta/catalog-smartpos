import React from 'react';
import PropTypes from 'prop-types';
import SingleProductTemplate
// , { getServerSideProps as getPropsFromSSR }
  from 'templates/SingleProduct';
import Head from 'components/Head';


export async function getServerSideProps(context) {
  return {
    props: {
      headProps: {
        description: 'riso descricao',
        imageWidth: '225',
        imageHeight: '225',
        imageUrl: '/riso.jpg',
        favIcon: '',
        siteName: 'riso ',
        siteUrl: context.req.headers.host,
        title: 'riso',
      },
    },
  };
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
