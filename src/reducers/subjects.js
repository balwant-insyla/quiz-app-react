import { ADD_SUBJECT, GET_SUBJECTS, EDIT_SUBJECT, DELETE_SUBJECT, GET_ALL_SUBJECTS, LOGOUT } from '../constants/actionTypes';

//const initialState = []
export default ( subjects = [], action) => {
    switch(action.type) {
        case GET_SUBJECTS:
            return action?.payload;
        case GET_ALL_SUBJECTS:
            return  action?.payload; //This call is used in quiz for students only.
        case ADD_SUBJECT:
            return [...subjects,  action?.payload];
        case EDIT_SUBJECT:
            return subjects.map((subject) => (subject._id === action.payload._id ? action.payload : subject));
        case DELETE_SUBJECT:
            return subjects.filter((subject) => subject._id !== action?.payload );
        case LOGOUT:
            localStorage.removeItem('token');
            return subjects;
        default:
            return subjects;
    }
}
