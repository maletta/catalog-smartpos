import React, {
  useState, useContext, useEffect, useRef,
} from 'react';

import Row from 'components/Row';
import Grid from 'components/Grid';
import SideBar from 'components/SideBar';
import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';

import { getProducts, getSearch } from 'requests';
import GridProducts from './GridProducts';
import GridProductsSpinner from './components/GridProductsSpinner';

const GridProductsWrapper = () => {
  const { filter, updateFilter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const mounted = useRef<boolean>(true);

  useEffect(() => {
    mounted.current = true;
    window.scrollTo(0, 0);
    // getProductList();
    setLoading(true);

    const promise = filter.search ? getSearch(shop.id, filter) : getProducts(shop, filter);

    promise.then(({ data }) => {
      if (mounted.current) {
        setProducts(data.produtos);
        setPageCount(data.totalPages);
      }
    }).catch(() => {
      if (mounted.current) setProducts([]);
    }).finally(() => {
      if (mounted.current) setLoading(false);
    });

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line
  }, [filter]);

  useEffect(() => {
    updateFilter({ ...filter, label: '' });
    // eslint-disable-next-line
  }, []);

  const GridListProducts = () => {
    if (loading) {
      return <GridProductsSpinner />;
    }

    return (
      <GridProducts products={products} pageCount={pageCount} />
    );
  };

  return (
    <Row>
      <Grid className="d-none d-md-block" cols="12 3 3 3 3">
        <SideBar />
      </Grid>
      <GridListProducts />
    </Row>
  );
};

export default GridProductsWrapper;
