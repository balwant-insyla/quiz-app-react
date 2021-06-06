import { GET_LEVELS, LOGOUT } from '../constants/actionTypes';

export default ( levels = [], action) => {
    switch(action.type) {
        case GET_LEVELS:
            return action?.payload;
        
        case LOGOUT:
            localStorage.removeItem('token');
            return levels;
        default:
            return levels;
    }
}