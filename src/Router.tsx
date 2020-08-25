import React from 'react'
import { Router, Route, Switch } from 'react-router-dom';

import paths from 'paths';
import history from 'utils/history';
// import GridProducts from 'containers/GridProducts';
import GridProductsWrapper from 'containers/GridProducts';
import Cart from 'containers/Cart';
import SingleProduct from 'containers/SingleProduct';
import RegisterData from 'containers/RegisterData';
import Address from 'containers/Address';
import Payment from 'containers/Payment';
import Conclusion from 'containers/Conclusion';

const AppRouter = () => {
  return (
    <Router history={history as any}>
      <Switch>
        <Route path={paths.home} exact component={GridProductsWrapper} />
        <Route path={paths.cart} exact component={Cart} />
        <Route path={paths.registerData} exact component={RegisterData} />
        <Route path={paths.address} exact component={Address} />
        <Route path={paths.payment} exact component={Payment} />
        <Route path={paths.conclusion} exact component={Conclusion} />
        <Route path={paths.previewCatalog} exact component={GridProductsWrapper} />
        <Route path={paths.singleProduct} component={SingleProduct} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
