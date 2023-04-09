import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import './AccountVerification.css';

function AccountVerification() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const token = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    const verification = async() => {
      const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: 'application/json'
        }
      }
      
            await axios.post(`https://myteahousetlv.herokuapp.com/api/user/verify-account/${token}`, {
              email: email,
              password: password
            }, config)
        window.close();
    }

  return (
    <div className='verification'>
        <form className='form-for-verification' onChange={handleSubmit}>
          <input placeholder='Your Email' className='input-verification' value={email} onChange={e => {
              e.preventDefault()
              setEmail(e.target.value)
            }} type="email" />
          <input placeholder='Your Password' className='input-verification' value={password} onChange={e => {
              e.preventDefault()
              setPassword(e.target.value)
            }} type="password" />
          <button className='btn-verification' type='submit' onClick={verification}>Verificate</button>
        </form>
    </div>
  )
}

export default AccountVerification