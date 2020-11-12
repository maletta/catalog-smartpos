import React from 'react';
import { GlobalContext } from '../hooks';

const returnPropsAsDefault = (store, props) => props;

// eslint-disable-next-line max-len
const Connect = (mapStateToProps = returnPropsAsDefault) => Component => function WrapConnect(props) {
  return (
    <GlobalContext.Consumer>
      {({ dispatch, store }) => {
        const storeProps = mapStateToProps(store, props);
        return <Component {...storeProps} dispatch={dispatch} />;
      }}
    </GlobalContext.Consumer>
  );
};

export default Connect;
