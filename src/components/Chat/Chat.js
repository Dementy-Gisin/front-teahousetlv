import React from 'react';
import './Chat.css';
import ChatsForAdmin from './ChatsForAdmin';
import ChatUser from './ChatUser';


function Chat() {
   
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
  
  return (
    <div >
        <div className='my-chat-screen'>
       
       <div className="container-div">
          
           
           {
                user.isAdmin ? <ChatsForAdmin user={user}/> : <ChatUser/> 
           }
           
           </div>
           </div>
        
               
    </div>
  )
}

export default Chat