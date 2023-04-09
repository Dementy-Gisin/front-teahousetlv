import React, { useState } from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';
import UpdateProfilePopUp from './UpdateProfilePopUp';
import './UserProfile.css'

function UserProfile() {

    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false)
    
    const togglePopup = () => {
      setTrueOrFalseBtn(!trueOrFalseBtn);
     
  }
  
   
  return (
    <div>
        <div className="my-profile">
        <div className="name-profile">
                  <h3>Hello, {user?.name}</h3>
            </div>
            <div className="image-profile-div">
                <img  onClick={() => togglePopup()} className='profile-image' src={user?.profilePhoto?.fileType 
                            ? 
                            `data:${user?.profilePhoto?.fileType};base64, 
                            ${user?.profilePhoto?.image?.data?.toString('base64')}` 
                            : null} 
                            alt="profilePhoto" 
                />
            </div>
            <div className={trueOrFalseBtn ? 'email-profile-div none-visible' : "email-profile-div"}>
              <div className="upper">Write Them</div>
              <div className="lower">Write Them</div>
              <div className="inside"><Link style={{textDecoration: 'none', color: 'green'}} to='/api/emails/send-email'>{user?.email}</Link></div>

            </div>
            
            {trueOrFalseBtn && <UpdateProfilePopUp handleclose={togglePopup} props={user}/>}
                
                <button className='update-btn' onClick={() => togglePopup()}>Update Profile</button>
               
               
        </div>
        
    </div>
  )
  }

export default UserProfile