import React, { useState, useContext, useEffect } from 'react';

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

  const getProductList = async () => {
    setLoading(true);

    const promise = filter.search ? getSearch(shop.id, filter) : getProducts(shop, filter);

    try {
      const { data } = await promise;
      setProducts(data.produtos);
      setPageCount(data.totalPages);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductList();
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

    console.log('produtos ', products, 'pageCount ', pageCount);
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
