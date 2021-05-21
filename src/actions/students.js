import { GET_STUDENTS } from '../constants/actionTypes'
import * as api from '../api/index.js'

export const getStudents = () => async (dispatch) => {
    try {
      const { data } = await api.fetchStudents()
      dispatch({type: GET_STUDENTS, payload: data})
    } catch (e) {
        throw new Error(e.response.data.message)
    }
  }