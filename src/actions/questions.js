import { ADD_QUESTION, GET_QUESTIONS, EDIT_QUESTION, DELETE_QUESTION, GET_QUIZ_QUESTIONS } from '../constants/actionTypes'
import * as api from '../api/index.js'

export const addQuestion = (newQuestion) => async (dispatch) => {
    try {
        const { data } = await api.createQuestion(newQuestion)
        dispatch({type: ADD_QUESTION, payload: data})

    } catch(e) {
        throw new Error(e.response.data.message)
    }
}

export const getQuestions = () => async (dispatch) => {
    try {
        const { data } = await api.fetchQuestions()
        dispatch({ type: GET_QUESTIONS, payload: data})
    } catch (e) {
        //console.log(e.response.data.message)
        throw new Error(e.response.data.message)

    }
}
export const editQuestion = (id, updateQuestion) => async (dispatch) => {
    try {
        const { data } = await api.updateQuestion(id, updateQuestion)
        dispatch({ type: EDIT_QUESTION, payload: data})
    } catch (e) {
        throw new Error(e.response.data.message)
    }
}
export const deleteQuestion = (id) => async (dispatch) => {
    try {
        await api.deleteQuestion(id)
        dispatch({type: DELETE_QUESTION, payload: id})

    } catch(e) {
        throw new Error(e.response.data.message)
    }
}

//Get Quiz  questions for student

export const getQuizQuestion = (subject, level, size) =>  async (dispatch) => {
    try {
        const { data } = await api.fetchQuizQuestions(subject, level, size)
        //console.log('quiz questions action ' + JSON.stringify(data))
        dispatch ({type: GET_QUIZ_QUESTIONS, payload: data})
    } catch (e) {
        throw new Error(e.response.data.message)   
    }
}