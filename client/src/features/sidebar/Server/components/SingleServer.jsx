import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchChannelByServer } from '../../Channel/channelSlice';
import { setCurrentServer } from './serverSlice'
import './styles/single.server.scss'
const SingleServer = ({server}) => {
  const dispatch = useDispatch();
  const history=useHistory();
  const currentServer = useSelector(state => state.server.currentServer);
  return (
    <>
      <div className={`${server._id===currentServer._id ? 'singleServer__clicked' : 'singleServer'}`} onClick={()=>{
        dispatch(setCurrentServer({
          _id:server._id,
          server_name:server.server_name,
          img:server.img,
          home:false
        }));

        dispatch(fetchChannelByServer(server._channels));
        history.push(`/channels/${server._id}`);
      }}>
        {server.img ? <img key={server._id} style={{ cursor: 'context-menu' }} 
          className={`${server._id===currentServer._id ? 'singleServer__clicked-image' : 'singleServer__image'}`}
          src={server.img} alt="singleServer"/>
          :
          <div className='singleServer__text'style={{ cursor: 'context-menu' }} >
            {server?.server_name?.slice(0,1)}
          </div>}
      </div>
    </>
  )
}

export default SingleServer
