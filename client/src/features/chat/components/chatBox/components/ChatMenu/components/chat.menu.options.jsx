import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteMessage, PinMessage, UnpinMessage } from '../../../../../chatSlice';
import '../styles/chat.menu.options.scss'
const ChatMenuOptions = ({msg}) => {
  const auth = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const onDelete=()=>{
    dispatch(DeleteMessage(msg._id));
  }
  const onPin=()=>{
    dispatch(PinMessage(msg._id));
  }
  const unPin=()=>{
    dispatch(UnpinMessage(msg._id))
  }
  return (
    <>
    <div className='chatMenuOptions'>
      <div className="chatMenuOptions__container">
    {auth._id===msg.sender._id ? <>
      <div className="chatMenuOptions__item">
        <div className="chatMenuOptions__item-label">
          Edit message
        </div>
        <div className="chatMenuOptions__item-icon">
          <svg aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      {msg.isPinned ? <div className="chatMenuOptions__item" onClick={unPin}>
        <div className="chatMenuOptions__item-label">
          Unpin Message
        </div>
        <div className="chatMenuOptions__item-icon">
          <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"></path></svg>
        </div>
      </div>: <div className="chatMenuOptions__item" onClick={onPin}>
        <div className="chatMenuOptions__item-label">
          Pin Message
        </div>
        <div className="chatMenuOptions__item-icon">
          <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"></path></svg>
        </div>
      </div>}
      
      <div className="chatMenuOptions__item" onClick={onDelete}>
        <div className="chatMenuOptions__item-deletelabel">
          Delete Message
        </div>
        <div className="chatMenuOptions_item-icon">
          <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
            <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
          </svg>
        </div>
      </div>
    </>:<>
    <div className="chatMenuOptions__item">
      <div className="chatMenuOptions__item-label">
        Reply Message
      </div>
      <div className="chatMenuOptions_item-icon">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z" fill="currentColor"></path>
        </svg>
      </div>
      </div>
    </>}
    </div>
    </div>
    </>
  )
}

export default ChatMenuOptions
