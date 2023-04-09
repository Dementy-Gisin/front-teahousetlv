import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';

function ChoiceUpdateDeletePopUp(props) {
    const ref = useRef(null);
    const refInput = useRef(null);
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

    const [file, setFile] = useState({}) 

    
    const updateChoice = async() => {
        const updatedTitle = refInput.current.value;
        const updatedDescription = ref.current.value;
        await axios.put(`https://myteahousetlv.herokuapp.com/api/choice/update-choice/${props.id}`, {
            title: updatedTitle,
            description: updatedDescription

        })
    }
    const deleteChoice = async() => {
        await axios.delete(`https://myteahousetlv.herokuapp.com/api/choice/delete-choice/${props.id}`)
                    .then(res => console.log(res.data))
        
    }
    const handleChangeForFile = (e) => {
        e.preventDefault();
       
        setFile(e.target.files[0])
      
      }
    const updateChoicePhoto = async() => {
        
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": 'multipart/form-data',
                'Accept': '*/*',
                
            }
            
          }
        await axios.put(`https://myteahousetlv.herokuapp.com/api/choice/update-choice-photo/${props?.id}`, {
            categoryPhoto: file
        }, config).then(res => console.log(res.data))
    
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
        <input className='wrapp-input' type="file" onChange={handleChangeForFile}/>
      </div>
        
                  
         
          
      
      <div>
              
            <button onClick={() => updateChoice()} className='btn-update'>Update</button>   
            <button onClick={() => deleteChoice()} className='btn-delete'>Delete</button>
            <button onClick={() => updateChoicePhoto()}>Update Choice Photo</button>
      </div>
       
    </div>
    
  </div>
  )
}

export default ChoiceUpdateDeletePopUp