import React from 'react'
import { useDispatch } from 'react-redux';
import dateChanged from '../../redux/isdatechnaged/isdatechanged.actions'
function OldMessage({msg}) {
    const date=new Date();
    const today=date.getDate();
    if(msg.createdAt){
        console.log(msg.createdAt.toDate().getDate());
    }
    console.log(today);
    const dispatch = useDispatch()
    return (
        <div>
            {/* {msg.createdAt&&new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(msg.createdAt)} */}
            {/* {msg.createdAt && msg.createdAt.toDate().getDate()===today && "today at "} */}
            {msg.createdAt && msg.createdAt.toDate().getDate()===today ? null:msg.createdAt.toDate().toDateString() }
            {dispatch(dateChanged())}
        </div>
    )
}

export default OldMessage
