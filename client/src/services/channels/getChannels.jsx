import { firestore } from '../../firebase/firebase';
import { collection, query,orderBy,onSnapshot } from "firebase/firestore";

const getChannels = async() => {
  const list_servers=[];
  const serverRef = query(collection(firestore, "servers"),orderBy("createdAt", "asc"));
  onSnapshot(serverRef, (snapshot) => {
    snapshot.forEach((doc)=>{
      list_servers.push({...doc.data(),id:doc.id});
    })
    return list_servers;
  })
}

export default getChannels
