import { useContext, createContext, useReducer } from 'react';
import storeReducer, { storeDefault } from '../../reducers/store';

/* Hook useCombinedReducers() */
const useCombinedReducers = () => {
  const [storeContext, store] = useReducer(storeReducer, storeDefault);

  return {
    globalContext: {
      storeContext,
    },
    reducers: { store },
  };
};

/* Criação do Contexto principal */
const defaultGlobalContext = {
  globalContext: {
    storeContext: { ...storeDefault },
  },
  dispatch: () => {},
};

/* Global Context */
const GlobalContext = createContext(defaultGlobalContext);

/* Hook useGlobalContext() */
const useGlobalContext = () => useContext(GlobalContext);

export { useCombinedReducers, useGlobalContext, GlobalContext };
