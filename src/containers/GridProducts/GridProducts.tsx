import React, { useState, useContext, useEffect } from 'react';

import GridList from 'components/GridList';
import Row from 'components/Row';
import Grid from 'components/Grid';
import SideBar from 'components/SideBar';
import FilterContext from 'contexts/FilterContext';
import ShopContext from 'contexts/ShopContext';

import GridProductsSpinner from './components/GridProductsSpinner';
import GridProductsPagination from './components/GridProductsPagination';

import { getProducts, getSearch } from 'requests';

type ShopData = {
  id: string
  selected: number
};

const GridProducts = () => {
  const { filter, updateFilter } = useContext(FilterContext);
  const { shop } = useContext(ShopContext);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const getProductList = async (shopData: ShopData) => {
    setLoading(true);

    const promise = filter.search ? getSearch(shopData.id, filter) : getProducts(shopData, filter);

    try {
      const { data } = await promise;
      setProducts(data.produtos);
      setPageCount(data.totalPages);
    }
    catch {
      setProducts([]);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductList(shop);
  }, [filter]);

  useEffect(() => {
    updateFilter({ ...filter, label: '' });
  }, []);

  const GridListProducts = () => {
    if (loading) {
      return <GridProductsSpinner />;
    }

    return (
      <Grid cols="12 12 9 9 9">
        <GridList
          items={products}
          notFound={products.length === 0}
        />
        {products.length > 1 && (
          <GridProductsPagination pageCount={pageCount} />
        )}
      </Grid>
    );
  }

  return (
    <Row>
      <Grid className="d-none d-md-block" cols="12 3 3 3 3">
        <SideBar />
      </Grid>
      <GridListProducts />
    </Row>
  );
};

export default GridProducts;
