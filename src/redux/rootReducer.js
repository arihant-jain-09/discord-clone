import {combineReducers} from 'redux';
import documentReducer from './document/documentReducer';
export default combineReducers({
  doc:documentReducer
})
