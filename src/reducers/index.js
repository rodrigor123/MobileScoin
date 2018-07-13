// import libraries
import { combineReducers } from 'redux';
import * as loginReducer from './login'
import * as faqReducer from './faq'
import * as homeReducer from './home'
import * as transReducers from './transaction'

export default combineReducers(Object.assign(
  loginReducer,
  faqReducer,
  homeReducer,
  transReducers
));