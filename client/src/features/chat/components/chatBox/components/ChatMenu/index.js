import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { MsgToEdit } from '../../../../chatSlice';
import ChatMenuOptions from './components/chat.menu.options';
import './styles/ChatMenu.scss';
const ChatMenu = ({msg}) => {
  const auth = useSelector(state => state.auth.user);
  const [openMore,setOpenMore]=useState(false);
  const dispatch = useDispatch();
  const handleEdit=(e)=>{
    e.preventDefault();
    dispatch(MsgToEdit(msg));
  }
  return (
    <>
      <div className="chatmenu">
        <div className="chatmenu__addreaction">
            <svg className='chatmenu__image' aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12.2512 2.00309C12.1677 2.00104 12.084 2 12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 11.916 21.999 11.8323 21.9969 11.7488C21.3586 11.9128 20.6895 12 20 12C15.5817 12 12 8.41828 12 4C12 3.31052 12.0872 2.6414 12.2512 2.00309ZM10 8C10 6.896 9.104 6 8 6C6.896 6 6 6.896 6 8C6 9.105 6.896 10 8 10C9.104 10 10 9.105 10 8ZM12 19C15.14 19 18 16.617 18 14V13H6V14C6 16.617 8.86 19 12 19Z"></path>
              <path d="M21 3V0H19V3H16V5H19V8H21V5H24V3H21Z" fill="currentColor"></path>
            </svg>
        </div>
        {
        auth._id===msg.sender._id ? 
        <div className="chatmenu__edit" onClick={handleEdit}>
          <svg className='chatmenu__image' aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path>
          </svg>
        </div> :
        <div className="chatmenu__reply" >
          <svg className='chatmenu__image' width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z" fill="currentColor"></path>
          </svg>
        </div>
        }
        <div className="chatmenu__more" onClick={()=>setOpenMore(true)}>
          <svg className='chatmenu__image' aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7 12.001C7 10.8964 6.10457 10.001 5 10.001C3.89543 10.001 3 10.8964 3 12.001C3 13.1055 3.89543 14.001 5 14.001C6.10457 14.001 7 13.1055 7 12.001ZM14 12.001C14 10.8964 13.1046 10.001 12 10.001C10.8954 10.001 10 10.8964 10 12.001C10 13.1055 10.8954 14.001 12 14.001C13.1046 14.001 14 13.1055 14 12.001ZM19 10.001C20.1046 10.001 21 10.8964 21 12.001C21 13.1055 20.1046 14.001 19 14.001C17.8954 14.001 17 13.1055 17 12.001C17 10.8964 17.8954 10.001 19 10.001Z"></path>
          </svg>
        </div>
        {openMore && <ChatMenuOptions msg={msg}/>}
      </div>
    </>
  )
}

export default ChatMenu
