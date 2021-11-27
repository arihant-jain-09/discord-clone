import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setCurrentServer } from './serverSlice'
import './styles/single.server.scss'
const SingleServer = ({server}) => {
  const dispatch = useDispatch();
  const history=useHistory();
  const currentServer = useSelector(state => state.server.currentServer)
  return (
    <>
      <div className={`${server.id===currentServer.id ? 'singleServer__clicked' : 'singleServer'}`} onClick={()=>{
        dispatch(setCurrentServer({
          id:server.id,
          email:server.email,
          name:server.servername,
          home:false
        }));
        history.push(`/channels/${server.id}`);
      }}>
        {server.serverimage ? <img key={server.id} style={{ cursor: 'context-menu' }} 
          className={`${server.id===currentServer.id ? 'singleServer__clicked-image' : 'singleServer__image'}`}
          src={server.serverimage} alt="singleServer"/>
          :
          <div className='singleServer__text'style={{ cursor: 'context-menu' }} >
            {server.servername.slice(0,1)}
          </div>}
      </div>
    </>
  )
}

export default SingleServer
