import { GET_STUDENTS } from '../constants/actionTypes'

export default (students =[], action) => {
    switch(action.type) {
        case GET_STUDENTS:
            return action?.payload
        default:
            return students
    }
}