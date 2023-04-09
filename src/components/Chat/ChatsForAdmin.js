import axios from 'axios';
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import './ChatsForAdmin.css';

function ChatsForAdmin({user}) {

    const [allChats, setAllChats] = useState([]);
    const socket = io.connect('https://localhost:5000');
    const [chatIndex, setChatIndex] = useState(0);
    const [allMessages, setAllMessages] = useState([]);
    const [forUserName, setForUserName] = useState({});
    let ref = useRef('');
    const [trueOrFalse, setTrueOrFalse] = useState(false);

    const fetchAllChats = async() => {

        const config = {
            headers: {
              "Authorization": `Bearer ${user?.token}`, 
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              'Cache-Control': 'no-cache',
              'Accept': '*/*',
            }  
          }
        await axios.get('https://myteahousetlv.herokuapp.com/api/chats/fetch-all-chats', config)
        .then(res=> setAllChats(res?.data));
    }
  
 const catchChatIndex = (index) => {
    

  setChatIndex(index)
  setForUserName(chats[index]?.user[1]);
  setTrueOrFalse(true);
  setAllMessages(chats[index]?.messages)
  
  
}
    const answerToUser = async() => {
      
        
      socket.emit('sendMessages', {content: ref.current.value, user: forUserName?._id ? forUserName?._id : forUserName?.id, userToCheck: user?._id ? user?._id : user?.id});
      const config = {
            headers: {
              "Authorization": `Bearer ${user?.token}`, 
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              'Cache-Control': 'no-cache',
              'Accept': '*/*',
            }  
          }
        if(ref.current.value){
            await axios.put(`https://myteahousetlv.herokuapp.com/api/chats/update-chat/${chats[chatIndex]._id ? chats[chatIndex]._id : chats[chatIndex].id}`, {
            
            message: ref.current.value
        }, config)
        }
        
       
    }
    
    
     
    useEffect(() => {
      fetchAllChats();
      
  }, [])
  useEffect(() => {
  
          
    socket.on('recievedMessages', (data) => {
              let userId;
              userId = user?._id ? user?._id : user?.id
             
              if(data?.content?.userToCheck === userId 
                || 
               (chats[chatIndex]?.user[1]?._id === data?.content?.user
                ||
                chats[chatIndex]?.user[1]?.id === data?.content?.user)
                ){
                  
                  setAllMessages([...allMessages, data?.content]);
              
              }
  
    }) 
   
    })   
    let chats;
    if(allChats){
        chats = Object.values(allChats);
    }
  
   
    const togglePopup = () => {
      setTrueOrFalse(!trueOrFalse);
    }
    







    const ChatWithCertainUser = (props) => {

        const messagesEndRef = useRef(null)
        
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView()
          }
          
          
       
        
       
        
        useEffect(() => {
            scrollToBottom()
          }, [allMessages]);
          
        
           
          return (
          
            <section className="chat-admin">
              
            <div className="div-for-height">
            {(allMessages)?.map((item, index) => (

            <div key={index}  className="messages-chat">
             
            {item?.userToCheck === user?._id ||
             item?.userToCheck === user?.id ? (  
              <div className="message">
                <div className="photo">
                <img style={{width: '45px', height: '45px', borderRadius: '50px'}} src={chats[chatIndex]?.user[0]?.profilePhoto?.fileType 
                ? 
                `data:${chats[chatIndex]?.user[0]?.profilePhoto?.fileType};base64, 
                ${chats[chatIndex]?.user[0]?.profilePhoto?.image?.data?.toString('base64')}` 
                : null} alt="" />
                </div>
                <p className="text">{item?.content}</p>
                <div ref={messagesEndRef}/>
              </div> ) :
             
              (
              <div className="message">
                <div className="photo" >
                <img style={{width: '45px', height: '45px', borderRadius:'100%'}} src={chats[chatIndex]?.user[1]?.profilePhoto?.fileType 
                ? 
                `data:${chats[chatIndex]?.user[1]?.profilePhoto?.fileType};base64, 
                ${chats[chatIndex]?.user[1]?.profilePhoto?.image?.data?.toString('base64')}` 
                : null} alt="" />
                </div>
                <p className="text">{item?.content}</p>
              </div>
                 )}    
            </div>
          
            ))}    
            
            </div>
            
           <div className="div-for-footer">
           <div className="footer-chat">
              
              <input
                ref={ref} 
                // value={ref}
                onChange={(e) => e.preventDefault()}
                type="text" className="write-message" placeholder="Type your message here"/>
              <button type='submit' value='Submit'  onClick={() => answerToUser()} className='send-message-admin-button'>Send Message</button>
              <button style={{cursor: 'pointer'}} className='close-button' onClick={props.handleclose}>close</button>
              
            </div>
            
           </div>
            
          </section>
        )

    }

  return (
    <div className="container-admin">
   
   
      <section className="discussions-admin">
      
        <div className="discussion-admin search-admin">
       
          <div   className="searchbar">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="Search..."></input>
          </div>
        </div>
        {chats?.map((item, index) => (
        <div key={item?._id} onClick={() => catchChatIndex(index)} className="discussion-admin message-active">
          <div className="photo">
            <img style={{width: '45px', height: '45px', borderRadius:'100%'}} src={item?.user[1]?.profilePhoto?.fileType 
                ? 
                `data:${item?.user[1]?.profilePhoto?.fileType};base64, 
                ${item?.user[1]?.profilePhoto?.image?.data?.toString('base64')}` 
                : null} alt="" />
          </div>
          <div className="desc-contact">
            <p className="name">{item?.user[1]?.name}</p>
            <p className="message">{item?.messages[item?.messages?.length - 1].content}</p>
           
          </div>
        
        </div>
          ))}  


      </section>
   
          {trueOrFalse && <ChatWithCertainUser handleclose={togglePopup}/>} 
     
    
  </div>
  
  )
}

export default ChatsForAdmin