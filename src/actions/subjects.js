import { ADD_SUBJECT, GET_SUBJECTS, EDIT_SUBJECT, DELETE_SUBJECT, GET_ALL_SUBJECTS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addSubject = (newSubject) => async (dispatch) => {
    try {
        const  { data }  = await api.createSubject(newSubject)
        console.log(`add subject action ${JSON.stringify(data)}`)
        dispatch({ type: ADD_SUBJECT, payload: data })
    } catch(e) {
        throw new Error(e.response.data.message)
    }

}

export const getSubjects = () => async (dispatch) => {
    try {
        const { data } = await api.fetchSubjects()
       //console.log(`get subjects action ${JSON.stringify(data)}`)
        //console.log(`get subjects action ${data[0].name}`)
        dispatch({type: GET_SUBJECTS, payload: data })
    } catch(e) {
        throw new Error(e.response.data.message)
    }
}

export const editSubject = (id, updates) => async (dispatch) => {
    try {
        console.log('Action '+id)
        console.log('Action '+JSON.stringify(updates))
        const { data } = await api.updateSubject(id, updates)
        dispatch({type: EDIT_SUBJECT, payload: data})
    } catch (e) {
        throw new Error(e.response.data.message)
    }
}
export const deleteSubject = (id) => async (dispatch) => {
    try {
        await api.deleteSubject(id)
        dispatch({ type: DELETE_SUBJECT, payload: id })
    } catch (e) {
        throw new Error(e.response.data.message)
    }
}

export const fetchSubjectsName = () => async (dispatch) => {
    try {
        const { data }  = await api.fetchSubjectsName()
        //console.log(JSON.stringify(data))
        dispatch({type: GET_ALL_SUBJECTS, payload: data})
    } catch(e) {
        throw new Error(e.response.data.message)
    }
}