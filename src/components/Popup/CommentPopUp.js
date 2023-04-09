import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './CommentPopUp.css';
function CommentPopUp(props) {
    const refresh = () => window.location.reload(true);
    const [text, setText] = useState('');
    const ref = useRef(null);
    const textToParse = localStorage.getItem('user');
    const user = JSON.parse(textToParse);
    const deleteComment = async() => {
        
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": 'application/json',
                "Authorization": `Bearer ${user.token}`     
                
            }
       
            }
            await axios.delete(`https://myteahousetlv.herokuapp.com/api/comments/delete-comment/${props?.content?._id}`, config)
            
            refresh();

    }

    const updateComment = async() => {

        const updatedComment = ref.current.value;
              
        const config = {
         headers: {
             "Access-Control-Allow-Origin": "*",
             "Content-Type": "application/json",
             Accept: 'application/json',
             Authorization: `Bearer ${user.token}`     
             
         }
    
         }
         await axios.put(`https://myteahousetlv.herokuapp.com/api/comments/update-comment/${props?.content?._id}`, {
            
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
      
                
       
        
    
    <div>
            {
                (props?.content?.user._id == user.id) ? (<>
                                                        <button onClick={() => updateComment()} className='btn-update'>Update</button>   
                                                        <button onClick={() => deleteComment()} className='btn-delete'>Delete</button>
                                                </>) : null
            }
    </div>
     
  </div>
  
</div>
  )
}

export default CommentPopUp