
import { AUTH, LOGOUT, UPLOAD_AVATAR, UPDATE_PROFILE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  
  try {
    
    const { data } = await api.signIn(formData);
    localStorage.setItem('token', data.token)
    //console.log(data)
    dispatch({ type: AUTH, data });

    router.push('/home');
  } catch (e) {
    
    //console.log(`action error signin ${e.response.data.message}`);
    //const { error } = e.response.data.message
    //dispatch({ type: ERROR, error });
    throw new Error(e.response.data.message)
    //throw new Error('custom message from action sign in')
    //setError(e.response.data.message)
    
  }
};
export const signup = (formData, router) => {

  return async (dispatch) => {

    
    //setError()
    try {

      const { data } = await api.signUp(formData)
      localStorage.setItem('token', data.token)
      dispatch({ type: AUTH, data })
      router.push('/home');

    } catch (e) {
      //console.log(`action error ${e.response.data.message}`);
      throw new Error(e.response.data.message)
      //throw new Error('custom message from action sign up')
      //setError(e.response.data.message)
      //const { error } = e.response.data.message
      //dispatch({ type: ERROR, error });
      
    }
  }
} 

export const logout  = (router) => {
  return async (dispatch) => {
    try {
      await api.logOut()
      //await api.logOut()
      const { data } = { token: undefined}
      localStorage.removeItem('token')
      dispatch({ type: LOGOUT, data })
      router.push('/')
    } catch (e) {
      throw new Error(e.response.data.message)
    }
  }
}

// export const getProfile = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchProfile()
//     dispatch({type: GET_PROFILE, data })
//   } catch(e) {
//       throw new Error(e.response.data.message)
//   }
// }

export const updateProfile = (updates) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(updates)
    dispatch({type: UPDATE_PROFILE, data })
  } catch(e) {
    //console.log(e.response.data.message)
    throw new Error(e.response.data.message)
  }
}

export const uploadAvatar = (file) => async (dispatch) => {
  try {
    //console.log('Action file data' + file)
    const { data } = await api.uploadAvatar(file)
    //console.log('Action data' + JSON.stringify(data))
    dispatch({type: UPLOAD_AVATAR, data})
  } catch(e) {
    //console.log(e.response.data.message)
    throw new Error(e.response.data.message)
  }
}

// export const getAvatar = () => async (dispatch) => {
//   try {
//     const { data } = await api.getAvatar()
//     console.log('Action data' + JSON.stringify(data))
//     dispatch({ type: GET_AVATAR, data })
//   } catch (e) {
//     throw new Error(e.response.data.message)
//   }
// }