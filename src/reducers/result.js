import { SAVE_RESULT, LOGOUT } from '../constants/actionTypes';

export default (result = [], action) => {
    switch(action.type) {
        case SAVE_RESULT:
            return [...result, action?.payload];
        case LOGOUT:
            localStorage.removeItem('token');
            return result;
        default:
            return result;
    }
}