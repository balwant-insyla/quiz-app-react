import axios from 'axios';
import { baseURL } from '../constants/baseURL'
//const localBaseURL = 'http://localhost:3000'
//const serverBaseURL = 'https://neeb-quiz-app.herokuapp.com'
//const API = axios.create({ baseURL: localBaseURL }); //local
const API = axios.create({ baseURL }) //server

//const accessToken = JSON.parse(localStorage.getItem('user')).token
// const authAPI = axios.create({
//   baseURL: 'http://localhost:3000',
//   headers: {
//     Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
//   }
// }); 

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.token}`;
  }

  return req;
});

export const signIn = (formData) => API.post('/users/login', formData);
export const signUp = (formData) => API.post('/users', formData);
export const logOut = () => API.post('/users/logout')

export const fetchProfile = () => API.get('/users/me')
export const updateProfile = (updates) => API.patch('/users/me', updates)
export const deleteProfile = () => API.delete('/users/me')
export const uploadAvatar = (file) => API.post('/users/me/avatar', file)
export const getAvatar = () => API.get('/users/me/avatar')

export const fetchStudents = () => API.get('/users/students')

export const fetchSubjects = () => API.get('/subjects');
export const fetchSubjectsName = () => API.get('/subjects/all')
export const createSubject = (newSubject) => API.post('/subjects', newSubject);
export const updateSubject = (id, updates) => API.patch(`/subjects/${id}`, updates)
export const deleteSubject = (id) => API.delete(`/subjects/${id}`)


export const createQuestion = (newQuestion) => API.post('/questions', newQuestion)
export const fetchQuestions = () => API.get('/questions/all')
export const fetchQuizQuestions = (subject, level, size) => API.get(`questions?subject=${subject}&level=${level}&size=${size}`)
export const updateQuestion = (id, updateQuestion) => API.patch(`/questions/${id}`, updateQuestion)
export const deleteQuestion = (id) => API.delete(`/questions/${id}`)

