import {combineReducers} from 'redux';
import documentReducer from './document/documentReducer';
import messageReducer from './message/messageReducer'
import clickedReducer from './clicked/clickedReducer'
export default combineReducers({
  doc:documentReducer,
  msg:messageReducer,
  click:clickedReducer
})
