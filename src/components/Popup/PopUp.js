import React, { useState } from 'react'
import './PopUp.css'
import photo1 from '../photos/1.jpg';
import photo2 from '../photos/2.jpg';
import photo3 from '../photos/3.jpg';
import photo4 from '../photos/4.jpg';
import photo5 from '../photos/5.jpg';
import photo6 from '../photos/6.jpg';
import photo7 from '../photos/7.jpg';
import photo8 from '../photos/8.jpg';
function PopUp(props) {
    
    const arrayOfPhotos = [photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8];
    const randomIndex = Math.floor(Math.random() * arrayOfPhotos.length);
   
    return (

 
  <div className='popup'>
  <div className="popup-inner"
  style={{width: '60%', height: '60%', opacity: 0.75, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: `url(${arrayOfPhotos[randomIndex]})`}}>
        
      <button style={{cursor: 'pointer'}} className='close-button' onClick={props.handleclose}>close</button>
      <div style={{textAlign: 'center', wordWrap: 'break-word', whiteSpace: 'normal'}}>
      <p style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}}>
        {props.content.description}<br/>
        </p>
      </div>
      
     
  </div>
</div>

)
   
  
}

export default PopUp