import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';

function CreateEventPopUp(props) {
    const [file, setFile] = useState({})
    const handleChangeForFile = (e) => {
        e.preventDefault();
       
        setFile(e.target.files[0])
      
    }
    const createNewEvent = async() => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": 'multipart/form-data',
                'Accept': '*/*',
                
            }
            
          }
        
        await axios.post(`https://myteahousetlv.herokuapp.com/api/events/create-event`, {
            title: refInput.current.value,
            description: ref.current.value,
            eventPhotos: file
        }, config).then(res => console.log(res.data))
    }
    const ref = useRef('');
    const refInput = useRef('');
    const [text, setText] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if(!text){
            setText(props?.content?.description)
        }
        else{
            setText(e.target.value)
        }
        
    }
  return (
    <div className='popup'>
    <div className="popup-inner"
    >
          
        <button style={{cursor: 'pointer'}} className='close-button' onClick={props.handleClose}>close</button>
       
      <div className="wrapp">
          <textarea className='textarea' ref={ref} onChange={e => handleChange(e)} 
          value={text}
          />
          <input className='wrapp-input' type="text" ref={refInput}/>
          <input type="file" onChange={handleChangeForFile}/>
      </div>
        
                  
         
          
      
      <div>
          <button onClick={() => createNewEvent()} className='btn-create-new-cat'>Create Event</button>    
      </div>
       
    </div>
    
  </div>
  )
}

export default CreateEventPopUp