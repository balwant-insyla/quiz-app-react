import { GET_STUDENTS, LOGOUT } from '../constants/actionTypes'

export default (students =[], action) => {
    switch(action.type) {
        case GET_STUDENTS:
            return action?.payload
        case LOGOUT:
            localStorage.removeItem('token');
            return { }
        default:
            return students
    }
}