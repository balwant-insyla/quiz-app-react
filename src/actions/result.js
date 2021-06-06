import { SAVE_RESULT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addResult = (result) => async (dispatch) => {
    try {
      const { data } = await api.saveResult(result);
      dispatch({type: SAVE_RESULT, payload: data});
    } catch (e) {
        throw new Error(e.response.data.message);
    }
  }