import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setServers } from '../../features/sidebar/Server/components/serverSlice';
import fetchServers from '../../services/server/fetchServers';

const useFetchServers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchServersHook=async()=>{
      const res = await fetchServers();
      dispatch(setServers(res));
    }
    fetchServersHook();
  }, [dispatch])
}

export default useFetchServers
