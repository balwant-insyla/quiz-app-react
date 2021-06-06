import { combineReducers } from 'redux';
import auth from './auth';
import subjects from './subjects';
import questions from './questions';
import students from './students';
import levels from './levels';
import result from './result'

export const reducers = combineReducers({ auth, subjects, questions, students, levels, result });
