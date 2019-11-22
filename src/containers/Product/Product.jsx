import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from 'utils/history';
import Row from 'components/Row';
import Grid from 'components/Grid';
import SideBar from 'components/SideBar';

import GridProducts from 'containers/GridProducts';
import SingleProduct from 'containers/SingleProduct';

const Product = (props) => {
  console.log(props);
  return (
    <>

      <div>Router</div>
      <Router
        history={history}
      >
        <Switch>
          <Route path="/produto/:id" exact component={SingleProduct} />
        </Switch>
      </Router>
      </>
  );
};

export default Product;
