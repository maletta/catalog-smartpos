import React from 'react'

import Spinner from 'components/Spinner';
import Grid from 'components/Grid';

const GridProductsSpinner = () => (
  <Grid
    cols="12 9 9 9 9"
    className="d-flex align-items-center justify-content-center"
  >
    <Spinner />
  </Grid>
);

export default GridProductsSpinner;
