import React,{useState} from 'react'
import './Emojicontainer.scss'
import data from './emojis.json'
import SearchIcon from '@material-ui/icons/Search';
const Emojicontainer = () => {
    const [formValue,setformValue]=useState('');
    const [emoji,setemoji]=useState([]);
    const handleSubmit=(e)=>{
        setemoji([]);
        e.preventDefault();
        let arr=[];
        data.map((item)=>{
            return item.tags.map((i)=>{
                if(i===formValue){
                    arr.push(item)
                }
            })
        })
        setemoji(arr);
        setformValue('');
    }
    return (
        <>
            <div className="emojicontainer">
                {console.log(emoji)}
                <div className="emojicontainer__header">
                    <div className="emojicontainer__header-inputdiv">
                        <form onSubmit={handleSubmit} className="emojicontainer__header-form">
                            <input type="text" onChange={(e)=>{setformValue(e.target.value)}} value={formValue} autoFocus placeholder='find the perfect emoji' className='emojicontainer__header-input'/>
                        </form>  
                        <div className="emojicontainer__header-search">
                            <SearchIcon style={{fontSize:'2rem',color:'#72767d'}}/>
                        </div>
                    </div>
                    <div className="emojicontainer__header-handicon">
                           👏
                    </div>
                </div>
                <div className="emojicontainer__body">
                    <div className="emojicontainer__sidebar">
                        <div className="emojicontainer__sidebar-items">
                            <div className="emojicontainer__sidebar-item">
                                😃
                            </div>
                            <div className="emojicontainer__sidebar-item">
                                😬
                            </div>
                            <div className="emojicontainer__sidebar-item">
                                🤪
                            </div>
                            
                        </div>
                    </div>
                    <div className="emojicontainer__content">
                        <div className="emojicontainer__content-header">
                            IN DEVELOPMENT
                        </div>
                        <div className="emojicontainer__content-items">
                            {!!emoji.length ? emoji.map((e,i)=>{
                                return <div key={i} className="emojicontainer__content-item">
                                    {e.emoji}
                                    </div>
                            }):(data && data.map((d,index)=>{
                                return <div key={index} className="emojicontainer__content-item">
                                    {d.emoji}
                                </div>
                            })) }
                            {data && data.map((d,index)=>{
                                return <div key={index} className="emojicontainer__content-item">
                                    {d.emoji}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Emojicontainer
