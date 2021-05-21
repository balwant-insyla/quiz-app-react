import { ADD_QUESTION, GET_QUESTIONS, EDIT_QUESTION, DELETE_QUESTION } from '../constants/actionTypes'

export default (questions = [], action) => {

    switch(action.type) {
        case GET_QUESTIONS:
            return action?.payload
        case ADD_QUESTION:
            return [...questions, action?.payload]
        case EDIT_QUESTION:
            return questions.map((question) => question._id === action?.payload._id ? action?.payload : question)
        case DELETE_QUESTION:
            return questions.filter((question) => question._id !== action?.payload)
        default:
            return questions
    }
}