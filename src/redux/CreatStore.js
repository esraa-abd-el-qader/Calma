import {createStore,applyMiddleware} from 'redux';
import  rootReducer from './RootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


export const middlewares = [thunk,logger];
export const store = createStore (rootReducer,applyMiddleware(...middlewares))
export default store;