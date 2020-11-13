import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
// import { useGlobalContext } from 'contexts/GlobalContext/context/hooks';
import ShopContext from 'contexts/ShopContext';

const NextLink = ({
  href, as, passHref, prefetch, replace, scroll, shallow, children,
}) => {
  // const { globalContext } = useGlobalContext();
  const { shop } = useContext(ShopContext);
  const hasDomainName = process.env.NEXT_PUBLIC_GET_NAME_DOMAIN === 'true';
  let newUrl = href;

  if (!hasDomainName) {
    newUrl = {
      pathname: href,
      query: {
        storeCode: shop.storeName,
      },
    };

    if (typeof url === 'object') {
      newUrl = {
        pathname: href.pathname,
        query: {
          ...href.query,
          storeCode: shop.storeName,
        },
      };
    }
  }

  return (
    <Link
      href={newUrl}
      as={as}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      {children}
    </Link>
  );
};

NextLink.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.object,
    }),
  ]),
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.object,
    }),
  ]),
  passHref: PropTypes.bool,
  prefetch: PropTypes.bool,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  children: PropTypes.node,

};

NextLink.defaultProps = {
  href: '',
  as: '',
  passHref: false,
  prefetch: true,
  replace: false,
  scroll: true,
  shallow: false,
  children: '',
};

export default NextLink;
