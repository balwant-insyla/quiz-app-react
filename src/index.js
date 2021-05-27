import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk'

import { reducers } from './reducers';
import AppRouter from '../src/routers/AppRouter'
//import App from './App';
import './index.css';


const persistConfig = {
  key: 'authType',
  storage: storage,
  whitelist: ['auth'] // only auth reducer will be persisted
  //blacklist: ['navigation'] // navigation will not be persisted
};
const pReducer = persistReducer(persistConfig, reducers)

const store = createStore(pReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
