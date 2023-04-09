import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChatUser.css';
import io from 'socket.io-client';
function ChatUser() {

    const userData = localStorage.getItem('user');
    let user = JSON.parse(userData);
    const [messagesArr, setMessagesArr] = useState([]);
    const [message, setMessage] = useState('');
    let [allMessages, setAllMessages] = useState([]);
    let [recievedMessages, setRecievedMessages] = useState([]);
    const socket = io.connect('https://myteahousetlv.herokuapp.com');
    const navigation = useNavigate();
    const messagesEndRef = useRef(null)
    const [allAndRecievedMessages, setAllAndRecievedMessages] = useState([]);
    const [chat, setChat] = useState({}); 
    const createChat = async(message) => {
        console.log('create');
        const token = user?.token;

        const config = {
            headers: {
              "Authorization": `Bearer ${user?.token}`, 
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              'Cache-Control': 'no-cache',
              'Accept': '*/*',
            }  
          }
       
        await axios.post('https://myteahousetlv.herokuapp.com/api/chats/chat-create',{
                message: message
        }, config)
        .then(res => 
        localStorage.setItem('user', JSON.stringify(res.data)))
        .catch(err => console.log(err))
        let userData = localStorage.getItem('user')
        user = JSON.parse(userData);
        const updatedUser = {
          ...user,
          token: token
        }
        localStorage.setItem('user',JSON.stringify(updatedUser));
       
        setMessage('');
    }
    
   
  
    const continueChating = async(message) => {
        console.log(user);
        const config = {
            headers: {
              "Authorization": `Bearer ${user?.token}`, 
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              'Cache-Control': 'no-cache',
              'Accept': '*/*',
            }  
          }
        
          await axios.put(`https://myteahousetlv.herokuapp.com/api/chats/update-chat/${user?.chat?._id}`, {
                message: message
          }, config)
          .catch(err => console.log(err))
       
          setMessage('');
         
    }
    
   
    const fetchSingleChat = async() => {
       
        const config = {
            headers: {
              "Authorization": `Bearer ${user?.token}`, 
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              'Cache-Control': 'no-cache',
              'Accept': '*/*',
            }  
          }
          
          if(user?.chat){
           await axios.get(`https://myteahousetlv.herokuapp.com/api/chats/fetch-single-chat/${user?.chat?._id}`,
           config).then(res => setAllMessages(res?.data?.messages))
          } 
    }
  useEffect(() => {
   
    if(user?.chat){
      
        fetchSingleChat();
     }
   }, [])
   const sendMessage = () => {

    
      socket.emit('sendMessages', {content: message, user: user?._id ? user?._id : user?.id, userToCheck: user?._id ? user?._id : user?.id});
    
     
     
      user?.chat ? continueChating(message) : createChat(message);
     
    
  }
  useEffect(() => {
  
    
    socket.on('recievedMessages', (data) => {
     
      let userId;
      
      userId = user?._id ? user?._id : user?.id
   
      if(((user?.chat?.user[0]?.id === data?.content?.userToCheck ||
        user?.chat?.user[0]?._id === data?.content?.userToCheck) &&
        userId === data?.content?.user)
        || userId === data?.content?.user){
        setAllMessages([...allMessages, data?.content]);
      }
      
  
    }) 
     

    })
   
   const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [allMessages]);
    
  return (
    <div className="main-chat-user">
            <section className="chat-admin">
               
            
               <div className="div-for-height">
               <div className="header-chat">
                 <i className="icon fa fa-user-o" aria-hidden="true"></i>
                 <p className="name">TeaHouse with {user?.name}</p>
                 <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
               </div>
               {allMessages?.map((item, index) => (
   
               <div key={index}  className="messages-chat">
                
               {(item?.userToCheck === user?._id ||
                item?.userToCheck === user?.id) 
               
                ? (  
                 <div className="message">
                   <div className="photo">
                   <img style={{width: '45px', height: '45px', borderRadius: '50px'}} src={user?.profilePhoto?.fileType 
                   ? 
                   `data:${user?.profilePhoto?.fileType};base64, 
                   ${user?.profilePhoto?.image?.data?.toString('base64')}` 
                   : null} alt="" />
                   </div>
                   <p className="text">{item?.content}</p>
                   <div ref={messagesEndRef}/>
                 </div> ) :
                
                 (
                 <div className="message">
                   <div className="photo" >
                   <img style={{width: '45px', height: '45px', borderRadius:'100%'}} src={user?.chat?.user[0]?.profilePhoto?.fileType 
                   ? 
                   `data:${user?.chat?.user[0]?.profilePhoto?.fileType};base64, 
                   ${user?.chat?.user[0]?.profilePhoto?.image?.data?.toString('base64')}` 
                   : null} alt=""/>
                   </div>
                   <p className="text">{item?.content}</p>
                 </div>
                 
                    )}  
                     <div ref={messagesEndRef}/>  
               </div>
             
               ))}    
               
               </div>
               
              <div style={{marginTop: '150px'}} className="div-for-footer" >
              <div className="footer-chat">
                 
                 <input
                 onChange={(e) => {
                e.preventDefault()
                setMessage(e?.target?.value)}}
                //    ref={ref} 
                   // value={ref}
                //    onChange={(e) => e.preventDefault()}
                   type="text"  value={message} className="write-message" placeholder="Type your message here"/>
                 <button onClick={message ? sendMessage : null} type='submit' value='Submit'  className='send-message-admin-button'>Send Message</button>
                
                 
               </div>
               
              </div>
               
             </section>
    </div>
    

    
  )
}

export default ChatUser