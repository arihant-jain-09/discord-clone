import {combineReducers} from 'redux';
import documentReducer from './document/documentReducer';
import messageReducer from './message/messageReducer'
import clickedReducer from './clicked/clickedReducer'
import openReducer from './openupload/messageReducer'
export default combineReducers({
  doc:documentReducer,
  msg:messageReducer,
  click:clickedReducer,
  open:openReducer,
})
