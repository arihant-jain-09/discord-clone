import { firestore } from '../../firebase/firebase';
import { collection, query,orderBy,onSnapshot,getDocs } from "firebase/firestore";
const fetchServers = async() => {
  const list_servers=[];
  const serverRef = query(collection(firestore, "servers"),orderBy("createdAt", "asc"));
  try {
    const querySnapshot=await getDocs(serverRef);
    querySnapshot.forEach((doc)=>{
      list_servers.push({...doc.data(),id:doc.id});
    })
    console.log(list_servers);
    return list_servers;
    // onSnapshot(serverRef, (snapshot) => {
    //   snapshot.forEach((doc)=>{
    //     list_servers.push({...doc.data(),id:doc.id});
    //   })
    //   return list_servers;
    // })
  } catch (error) {
    console.error(error);
    return [];
  }
 
}

export default fetchServers
