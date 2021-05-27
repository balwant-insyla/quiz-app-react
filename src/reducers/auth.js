import * as actionType from '../constants/actionTypes';

const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      //localStorage.setItem('user', JSON.stringify({ ...action?.data }));

      return { ...state, user: action?.data };
    case actionType.LOGOUT:
      localStorage.removeItem('token');
      return { }
    // case actionType.GET_PROFILE:
    //   const getUser = {...JSON.parse(localStorage.getItem('user')), ...action?.data } 
    //   localStorage.setItem('user', JSON.stringify(getUser));
    //   return { ...state, user: action?.data }
    case actionType.UPDATE_PROFILE:

      //console.log('reducer update' + JSON.stringify(action?.data))
      //const newUser = {...JSON.parse(localStorage.getItem('user')), ...action?.data } 
      //console.log('reducer update' + JSON.stringify(newUser))
      //localStorage.setItem('user', JSON.stringify(newUser));
      return { ...state, user: action?.data }
    case actionType.UPLOAD_AVATAR:
      //const uploadAvatar = {...JSON.parse(localStorage.getItem('user')), ...action?.data } 
      //localStorage.setItem('user', JSON.stringify(uploadAvatar));
      return { ...state, user: action?.data }
    default:
      return state;
  }
};

export default authReducer;
