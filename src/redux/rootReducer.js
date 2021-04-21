import {combineReducers} from 'redux';
import documentReducer from './document/documentReducer';
import messageReducer from './message/messageReducer'
import clickedReducer from './clicked/clickedReducer'
import openReducer from './openupload/messageReducer'
import ReplyclickedReducer from './replyclicked/replyclickedReducer'
import replytoggleReducer from './replytoggle/replytoggleReducer'
import currentserverReducer from './server/serverReducer'
import newserverReducer from './newserver/newserverReducer';
import CurrentRoleReducer from './roles/rolesReducer';
export default combineReducers({
  doc:documentReducer,
  msg:messageReducer,
  click:clickedReducer,
  open:openReducer,
  reply:ReplyclickedReducer,
  replytoggle:replytoggleReducer,
  currentserver:currentserverReducer,
  newserver:newserverReducer,
  currentrole:CurrentRoleReducer,
})
