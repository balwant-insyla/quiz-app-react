import { combineReducers } from 'redux';

//import posts from './posts';
import auth from './auth';
import subjects from './subjects'
import questions from './questions'
import students from './students'

export const reducers = combineReducers({ auth, subjects, questions, students });
