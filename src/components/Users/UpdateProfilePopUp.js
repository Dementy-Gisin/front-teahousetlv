import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import './UpdateProfilePopUp.css';
import cam from '../../logos/cam.jpg'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function UpdateProfile({props, handleclose}) {

  const [name, setName] = useState(`${props?.name}`);
  const [email, setEmail] = useState(`${props?.email}`);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [file, setFile] = useState({});
  const navigation = useNavigate();
  const uploadPhoto = async() => {
    const config = {
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": 'multipart/form-data',
          'Accept': '*/*',
          
      }
      
    }
    
     await axios.put(`https://myteahousetlv.herokuapp.com/api/user/update-users-photo/${props?.id ? props?.id : props?._id}`,{
        
        profilePhoto: file
      }, config).catch(err => {
        if(err){
          toast.error('click on camera and try again', {
            position: toast.POSITION.BOTTOM_CENTER,
            draggable: true,
            closeOnClick: true,
            theme: 'dark'
          })
      }})
      
     

  }
  const updateDetailsProfile = async() => {
    const config = {
      headers: {
        "Authorization": `Bearer ${props?.token}`, 
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Accept': '*/*',
      }  
    }
   await axios.put(`https://myteahousetlv.herokuapp.com/api/user/updateprofile/${props?.id}`, {
        name: name,
        email: email
    }, config)

     
  }
  const updatePassword = async() => {

    const config = {
      headers: {
        "Authorization": `Bearer ${props?.token}`, 
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Accept': '*/*',
      }  
    }
    await axios.put(`https://myteahousetlv.herokuapp.com/api/user/updatep/${props?.id}`,{

        oldPassword: oldPassword,
        newPassword: newPassword

    }, config).catch(err => {
      if(err){
        toast.error('Something Went Wrong', {
          position: toast.POSITION.BOTTOM_CENTER,
          draggable: true,
          closeOnClick: true,
          theme: 'dark'
        })
      }
    })
    navigation('/');
  }
  const deleteUserProfile = async() => {
    const config = {
      headers: {
        "Authorization": `Bearer ${props?.token}`, 
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Accept': '*/*',
      }  
    }
    await axios.delete(`https://myteahousetlv.herokuapp.com/api/user/delete/${props?.id}`, config)
    localStorage.clear();
    navigation('/');
  }
  const handleChangeForName = (e) => {
    e.preventDefault();
    if(!name){
        setName(props?.name)
    }
    else{
        setName(e.target.value)
    }
  }
  const handleChangeForEmail = (e) => {
    e.preventDefault();
    if(!email){
        setEmail(props?.email)
    }
    else{
        setEmail(e.target.value)
    }
  }
  const handleChangeForNewPassword = (e) => {
      
      e.preventDefault();
      setNewPassword(e?.target?.value)
      
  }
  const handleChangeForOldPassword = (e) => {
    e.preventDefault();
    setOldPassword(e?.target?.value)
    
  
  }
  const handleChangeForFile = (e) => {
    e.preventDefault();
    
    if(!file){
        setFile(props?.profilePhoto)
    }
    else{
      
        setFile(e.target.files[0])
    }
  }


    return (
    <div>
      <div className="pop-up">
        <div className="pop-up-inner">
        
        <div className="update-details">
          <p>Name:</p> 
            <input className='input-update-details' placeholder={name} type="text" onChange={handleChangeForName}/>
          <p>Email:</p> 
          <input className='input-update-details' style={{marginBottom: '10px'}} placeholder={email} type="email" onChange={handleChangeForEmail}/>
            
            <button className='update-details-btn' onClick={() => updateDetailsProfile()}>Update Details</button>
        </div>
        <div className="upload-photo-div">
           
           <label htmlFor="input-upload-photo">
              <img className='cam-upload-photo' src={cam} alt="" />
              <input id='input-upload-photo' className='input-upload-photo' type="file" name='file' onChange={handleChangeForFile}/>
            </label>  
              <button className='upload-photo-button' onClick={() => uploadPhoto()}>Upload Photo</button>
           
        </div>
        <div className="update-password-div">
              <p>Password:</p>
              <input placeholder='enter old password' className='input-password' type="password" onChange={handleChangeForOldPassword}/>
              <input placeholder='enter new password' className='input-password' type="password" onChange={handleChangeForNewPassword}/>
              <button className="update-password-btn" onClick={() => updatePassword()}>
                Update Password
              </button>
        </div>   
            <button onClick={() => deleteUserProfile()} className='delete-profile-btn'>Delete Profile</button>
      </div>
        
        <button className='close-button' onClick={handleclose}>close</button>
        </div>
      
      
    </div>
  )
}

export default UpdateProfile