import axios from 'axios';
import React, { useRef, useState } from 'react'
import './CommentPopUpDelete.css';

function CommentPopUpDelete(props) {
    const refresh = () => window.location.reload(true);
    const [text, setText] = useState('');
    const ref = useRef(null);

    const updateComment = async() => {

        const updatedComment = ref.current.value;
        const text = localStorage.getItem('user');
        const user = JSON.parse(text);
        
        const config = {
         headers: {
             "Access-Control-Allow-Origin": "*",
             "Content-Type": "application/json",
             "Accept": 'application/json',
             "Authorization": `Bearer ${user.token}`     
             
         }
    
         }
         await axios.put(`https://myteahousetlv.herokuapp.com/api/comments/delete-comment/${props?.content?._id}`, {
            
            description: updatedComment
         }, config).then(response => console.log(response));
        
        refresh();
    }
    const handleChange = (e) => {
        e.preventDefault();
        if(!text){
            setText(props?.content?.description)
        }
        else{
            setText(e.target.value)
        }
        
    }
    const deleteComment = async() => {
        const text = localStorage.getItem('user');
        const user = JSON.parse(text);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${user.token}`     
                
            }
       
            }
            await axios.delete(`https://myteahousetlv.herokuapp.com/api/comments/delete-comment/${props?.content?.id}`, {
               
           
            }, config)
           
           // refresh();

    }
   
  return (
    <div className='popup'>
  <div className="popup-inner"
  >
        
      <button style={{cursor: 'pointer'}} className='close-button' onClick={props.handleclose}>close</button>
     
    <div className="wrapp">
        <textarea className='textarea' ref={ref} onChange={e => handleChange(e)} 
        value={text}
        />
    </div>
      
      <button onClick={() => deleteComment()}>Delete</button>
      <button onClick={() => updateComment()} className='btn-update'>Update</button>   
  </div>
  
</div>
  )
}

export default CommentPopUpDelete