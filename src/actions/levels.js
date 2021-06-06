import { GET_LEVELS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getLevels = () => async (dispatch) => {
    try {
      const { data } = await api.fetchLevels();
      dispatch({type: GET_LEVELS, payload: data});
    } catch (e) {
        throw new Error(e.response.data.message);
    }
  }