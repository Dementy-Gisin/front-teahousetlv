import axios from 'axios';
import React, {useRef, useState} from 'react'
import './Comments.css'
import CommentPopUp from '../Popup/CommentPopUp';
import {toast} from 'react-toastify';
function Comments({props}) {

  const [comment, setComment] = useState([{}]);
  const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false);
  const text = localStorage.getItem('user');
  const user = JSON.parse(text);
  const togglePopup = (item) => {
    setTrueOrFalseBtn(!trueOrFalseBtn);
    setComment(item);
   
}
        
  const ref = useRef(null);
  const refresh = () => window.location.reload(true);

   const createComment = async() => {
        const comment = ref.current.value;
       
        if(user?.isAccountVerified){
        const config = {
         headers: {
             "Access-Control-Allow-Origin": "*",
             "Content-Type": "application/json",
             Accept: 'application/json',
             Authorization: `Bearer ${user?.token}`     
        }
        }
        
        
        await axios.post(`https://myteahousetlv.herokuapp.com/api/comments/create-comment/${props._id}`, {
            user: user,
            description: comment
         }, config).catch(err => console.log(err))
         
            refresh();
        }else{
            toast.error('error, something went wrong', {
                position: toast.POSITION.BOTTOM_CENTER,
                draggable: true,
                closeOnClick: true,
                theme: 'dark'
              })
        }
    }
    let comments;
    if(props?.comments != null){
        comments = Object.values(props?.comments);
    }        
  return (
    <div>
          <div className="all-comments-div">
                {
                    comments?.map(item => (
                        <div key={item?._id} className="comment">
                            <div className="comment-details">
                                <div className='user-comment'>

                                
                            
                            <img style={{cursor: 'pointer', width: '60px', height: '60px', borderRadius: '50%'}} src={item?.user?.profilePhoto?.fileType 
                                                        ? 
                                                    `data:${item?.user?.profilePhoto?.fileType};base64, 
                                                    ${item?.user?.profilePhoto?.image?.data?.toString('base64')}` 
                                                    : null
                                                } alt="" />
                            <h4>{item?.user?.name}</h4>
                            </div>
                            <p>{item.description}</p>
                           
                            <div>
                            {trueOrFalseBtn && <CommentPopUp handleclose={togglePopup} content={comment}/>}
                            <div className="buttons-comments-div">
                                {(item?.user?._id === user?.id && user?.id) ?
                                (<>
                                          <button style={{backgroundColor: 'brown'}} onClick={() => togglePopup(item)}>Update</button>
                                          <button style={{backgroundColor: 'black'}} onClick={() => togglePopup(item)}>Delete</button>
                                </>) : null} 
                          
                            </div>
                           
                            </div>
                            </div>
                                                
                               
                        
                        </div>
                    ))
                }

            </div>
        <div className="main-comment-container">
            <div className="comment-flexbox">
                <h4 className='comment-text'>Comments</h4>
                <textarea style={{width: '60%'}}
                ref={ref}
                className='input-box'
                
                />
                <button onClick={createComment} className='comment-btn'>Submit</button>
            </div>
            
        </div>
       
    </div>
  )
}

export default Comments