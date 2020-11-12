import React from 'react';
import PropTypes from 'prop-types';
import { useCombinedReducers, GlobalContext } from 'contexts/GlobalContext/context/hooks';
import { createThunkMiddleware as thunk } from 'contexts/GlobalContext/context/middleware/thunk';

const Provider = ({ children }) => {
  const { globalContext, reducers } = useCombinedReducers();

  const triggerDispatchs = (action) => {
    const keys = Object.keys(reducers);
    // console.log('reducers ', reducers[keys[0]]);
    for (let i = 0; i < keys.length; i += 1) {
      reducers[keys[i]](action);
    }
  };

  const withMiddleware = (action) => {
    const dispatch = triggerDispatchs;
    const getState = () => globalContext;
    thunk()({ dispatch, getState })(action);
  };

  return (
    <GlobalContext.Provider
      value={{
        globalContext,
        dispatch: withMiddleware,
        reducers,
        storeReducer: reducers.store,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
