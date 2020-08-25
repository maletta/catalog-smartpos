import React from 'react';

import GridList from 'components/GridList';
import Grid from 'components/Grid';

import PropTypes from 'prop-types';
import GridProductsPagination from './components/GridProductsPagination';


type ShopData = {
  id: string,
  selected: number
};

interface IGridProcuts {
products: any,
pageCount: any
}

const GridProducts : React.FC<IGridProcuts> = ({ products, pageCount }) => (
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


GridProducts.propTypes = {
  products: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }).isRequired,
  pageCount: PropTypes.node.isRequired,
};

export default GridProducts;
