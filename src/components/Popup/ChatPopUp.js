import axios from 'axios';
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
function ChatPopUp() {
    
    const [allChats, setAllChats] = useState([]);
    const socket = io.connect('https://myteahousetlv.herokuapp.com');
    const [chatIndex, setChatIndex] = useState(0);
    const [allMessages, setAllMessages] = useState([]);
    const [forUserName, setForUserName] = useState({});
    let ref = useRef('');

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [chats[chatIndex]?.messages]);
      const answerToUser = async(id) => {
      
        socket.emit('sendMessages', {content: ref.current.value, user: forUserName?._id ? forUserName?._id : forUserName?.id});
       
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
            await axios.put(`https://myteahousetlv.herokuapp.com/api/chats/update-chat/${id}`, {
            
            message: ref.current.value
        }, config)
        }
        
       
    }
      useEffect(() => {

  
        socket.on('recievedMessages', (data) => {
                  console.log(data?.user, allMessages[0]?.user);
                  let userId;
                  userId = user?._id ? user?._id : user?.id
                  if(userId === data?.content?.user || allMessages[0]?.user === data?.content?.user){
                      
                      allMessages.push(data.content);
                      setAllMessages([...allMessages]);
                  
                  }
      
        }) 
       
        })
   
      return (
      
        <section className="chat-admin">
          
        <div className="div-for-height">
        {(allMessages)?.map((item, index) => (

        <div key={index}  className="messages-chat">
        {user?._id === item?.user ? (  
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
            <img style={{width: '45px', height: '45px', borderRadius:'100%'}} src={forUserName?.profilePhoto?.fileType 
            ? 
            `data:${forUserName?.profilePhoto?.fileType};base64, 
            ${forUserName?.profilePhoto?.image?.data?.toString('base64')}` 
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
          <button type='submit' value='Submit'  onClick={() => answerToUser(chats[chatIndex]._id)} className='send-message-admin-button'>Send Message</button>
         
          
        </div>
        
       </div>
        
      </section>
    )
}

export default ChatPopUp