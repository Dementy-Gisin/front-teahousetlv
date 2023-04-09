import React from 'react'
import './Registration.css'
function BackdropComp({props}) {
  return (
    <div>
        <div className="header-container">
        <div className="header-text">
                Welcome          
        </div>
        <div className="header-text">
          To My App
        </div>
        <div className="small-text">
          Please sign in
        </div>
        </div>   
        <div className="inner-container">
          <div className="box-container2">
            <div className="form-container">
            <input className='input' placeholder='Your Name' type="text" value={name} onChange={e => {
              e.preventDefault()
              setName(e.target.value)
            }}/>
      
        <input className='input' placeholder='Your Email' type="email" value={email} onChange={e => {
              e.preventDefault()
              setEmail(e.target.value)
            }}/>
       
          <input className='input' placeholder='Your Password' type="password" value={password} onChange={e => {
              e.preventDefault()
              setPassword(e.target.value)
            }}/>
            <Link to='' className='link-forget-password'>forget password?</Link>
             <button className='btn-input' type='submit' onClick={registrate}>SignIn</button> 
            <Link to=''>
              Don't have an account? <p className='bolded-link'>Signup</p>
            </Link>
            </div>
          </div>

        </div>
    </div>
  )
}

export default BackdropComp