import axios from 'axios';
import * as ActionTypes from 'contexts/GlobalContext/action-types';

const storePath = `${process.env.NEXT_PUBLIC_MAIN_API}/v1/loja`;

const getStoreInfo = name => axios.get(`${storePath}/${name}`);

export const getStoreAction = payload => dispatch => getStoreInfo(payload).then(
  (response) => {
    const store = {
      ...response.data,
      storeName: payload,
      found: true,
    };
    dispatch({ type: ActionTypes.SET_STORE, payload: store });
    return response;
  },
)
  .catch(() => {
    const store = {
      storeName: payload,
      found: false,
    };
    dispatch({ type: ActionTypes.SET_STORE, payload: store });
  });

export default {};
