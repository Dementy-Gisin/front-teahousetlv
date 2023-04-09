import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script'
import FacebookLogin from 'react-facebook-login';

function Registration() {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
 const handleTelegramResponse = async(response) => {
    console.log(response);
 }
 const responseInstagram = async(response) => {
  const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: 'application/json'
    }
  }
  await axios.post('https://myteahousetlv.herokuapp.com/api/user/instagram-login', {
        email: response.email,
        name: response.name,
        token: response.accessToken,
        id: response.userID
  }, config).then(res => {
   
    if(res.status === 200){
     localStorage.setItem('user', JSON.stringify(res.data));
     
     
     toast.success('successfully logged in',{
       position: toast.POSITION.BOTTOM_CENTER,
       draggable: true,
       closeOnClick: true,
       theme: 'dark'
     }) 
    
   }
    navigation('/');
 })
 .catch(() => {
   toast.error('error, something went wrong', {
     position: toast.POSITION.BOTTOM_CENTER,
     draggable: true,
     closeOnClick: true,
     theme: 'dark'
   })
 })
 }
 const responseFailureInstagram = (response) => {
      console.log(response);
 }
  const responseFacebook = async(response) => {
    const config = {
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: 'application/json'
      }
    }
    await axios.post('https://myteahousetlv.herokuapp.com/api/user/facebook-login', {
          email: response.email,
          name: response.name,
          token: response.accessToken,
          id: response.userID
    }, config).then(res => {
     
      if(res.status === 200){
       localStorage.setItem('user', JSON.stringify(res.data));
       
       
       toast.success('successfully logged in',{
         position: toast.POSITION.BOTTOM_CENTER,
         draggable: true,
         closeOnClick: true,
         theme: 'dark'
       }) 
      
     }
      navigation('/');
   })
   .catch(() => {
     toast.error('error, something went wrong', {
       position: toast.POSITION.BOTTOM_CENTER,
       draggable: true,
       closeOnClick: true,
       theme: 'dark'
     })
   })
  }
  const responseFailureFacebook = (response) => {
    console.log(response);
  }
  const responseSuccessGoogle = async(response) => {
    
    const config = {
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: 'application/json'
      }
    }
      console.log(response?.tokenId);
      await axios.post('https://myteahousetlv.herokuapp.com/api/user/google-login', {
        token: response.tokenId
      }, config).then(res => {
       
         if(res.status === 200){
          localStorage.setItem('user', JSON.stringify(res.data));
          
          
          toast.success('successfully logged in',{
            position: toast.POSITION.BOTTOM_CENTER,
            draggable: true,
            closeOnClick: true,
            theme: 'dark'
          }) 
         
        }
         navigation('/');
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          draggable: true,
          closeOnClick: true,
          theme: 'dark'
        })
      })
     
  } 
  const responseErrorGoogle = (response) => {
    console.log(response);
  }
  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({clientId: '732398712716-etpefk6vthlbp5p9vu5guh2ucob1g41b.apps.googleusercontent.com'})
    })
  }, [])
  const registrate = async() => {
    
    const config = {
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: 'application/json'
      }
          
      }
          await axios.post('https://myteahousetlv.herokuapp.com/api/user/register', {
            name: name,
            email: email,
            password: password
          }, config)
          
  }
  const login = async() => {
    const config = {
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: 'application/json'
      }
          
      }
          await axios.post('https://myteahousetlv.herokuapp.com/api/user/login', {
            email: email,
            password: password
          }, config).then(res => {
            if(res.status === 200){
              localStorage.setItem('user', JSON.stringify(res.data));
              
              
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
          })
          
  }
  const backgroundAnimations = {
    expanded: {
      width: '233%',
      heigth: '150%',
    },
    collapsed: {
      width: '160%',
      heigth: '75%',
      borderRadius: '50%',
      transform: 'rotate(60deg)'
    }
  }
  const [isExp, setIsExp] = useState(false);
  const doTransition = {
    type: 'spring',
    duration: 2.3,
    stiffness: 30,
  }
  const doAnimation = () => {
    setIsExp(true);
    setTimeout(() => {
      setIsExp(false);
    }, doTransition.duration * 1000 - 500)
  }
  const [toHide, setToHide] = useState(false);
  
  
  return (
    <div>
        
        
        <div className='for-background'>
        <div className='main-form-inputs'>
      
      <div className='box-container'>
      <div className="top-container">
        <motion.div initial={false} animate={isExp ? 'expanded' : 'collapsed'} variants={backgroundAnimations} transition={doTransition} className="back-drop" />
        
        <div className="header-container">
        <div className="header-text">
                Welcome          
        </div>
        <div className="header-text">
          To Tea House
        </div>
        <div className="small-text">
          {toHide ? <p> Please sign in here</p> : <p> Please sign up here</p>}
          
        </div>
        </div>   
        <div className="inner-container">
          <div className="box-container2">
            <div className="form-container">
            <input className={toHide ? 'hide' : 'input'} placeholder='Your Name' type="text" value={name} onChange={e => {
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
             <button className='btn-input' type='submit' onClick={toHide ? login : registrate}>Click</button> 
            <Link onClick={() => {
                toHide ? setToHide(false) : setToHide(true)
                doAnimation();
            }}>
              Have an account? <p className='bolded-link'>SignIn</p>
            </Link>
            </div>
            <div className='social-registration'>
            <GoogleLogin
                  clientId='732398712716-etpefk6vthlbp5p9vu5guh2ucob1g41b.apps.googleusercontent.com'
                  clientSecret='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'
                  buttonText='Login With Google'
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseErrorGoogle}
                  cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin 
                    appId='761350088748263'
                    autoLoad={false}
                    fields='name,email, picture'
                    callback={responseFacebook}
                    onFailure={responseFailureFacebook}
            />
            </div>
            
          
          </div>

        </div>
        </div>
       
            
          
         
              
      </div>
      </div>
    </div>
             
    </div>
    
  
    
  )
}

export default Registration
