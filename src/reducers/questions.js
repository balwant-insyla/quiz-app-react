import { ADD_QUESTION, GET_QUESTIONS, EDIT_QUESTION, DELETE_QUESTION, GET_QUIZ_QUESTIONS, LOGOUT } from '../constants/actionTypes'

export default (questions = [], action) => {

    switch(action.type) {
        case GET_QUESTIONS:
            return action?.payload
        case GET_QUIZ_QUESTIONS:
            return action?.payload
        case ADD_QUESTION:
            return [...questions, action?.payload]
        case EDIT_QUESTION:
            return questions.map((question) => question._id === action?.payload._id ? action?.payload : question)
        case DELETE_QUESTION:
            return questions.filter((question) => question._id !== action?.payload)
        case LOGOUT:
            localStorage.removeItem('token');
            return { }
        default:
            return questions
    }
}