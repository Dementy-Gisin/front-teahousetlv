import axios from 'axios';
import React, { useState } from 'react'
import './SendEmail.css'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SendEmail() {
  
    const [textInput, setTextInput] = useState('');
    const [textAreaInput, setTextAreaInput] = useState('');
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const navigation = useNavigate();
    const sendEmail = async() => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                 Authorization: `Bearer ${user?.token}`
            }
        }
        await axios.post('https://myteahousetlv.herokuapp.com/api/emails/send-email', {
            subject: textInput,
            text: textAreaInput
        }, config).then(res => {
            if(res.status === 200){
                toast.success('successfully logged in',{
                    position: toast.POSITION.BOTTOM_CENTER,
                    draggable: true,
                    closeOnClick: true,
                    theme: 'dark'
              }) 
             
            }
            navigation('/')
          })
          .catch(() => {
            toast.error('error, something went wrong', {
                position: toast.POSITION.BOTTOM_CENTER,
                draggable: true,
                closeOnClick: true,
                theme: 'dark'
            })
          });
       
    }
    const handleInput = (e) => {
        e.preventDefault();
        setTextInput(e.target.value)
    }
    const handleTextArea = (e) => {
        e.preventDefault();
        setTextAreaInput(e.target.value)
    }
  
   return (
    <div>
        <div className="email-send">
        <form action="">
            <div className="subject">
            <h5>Subject :</h5>
            <input type="text" className='subject-area' onChange={e => handleInput(e)}/>
            </div>
            <div className="message-text">
                <h5>Message :</h5>
            <textarea className='message-area' onChange={e => handleTextArea(e)}>

            </textarea>
            </div>
            
            <button type='submit'  className='email-btn' onClick={sendEmail}>Send Email</button>
        </form>
        </div>
        
    </div>
  )
}

export default SendEmail