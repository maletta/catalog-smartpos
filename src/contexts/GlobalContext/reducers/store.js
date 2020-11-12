import * as ActionTypes from '../action-types';

export const storeDefault = {
  storeName: null,
  id: null,
};

const storeReducer = (state = storeDefault, action) => {
  switch (action.type) {
    case ActionTypes.SET_STORE: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};

export default storeReducer;
