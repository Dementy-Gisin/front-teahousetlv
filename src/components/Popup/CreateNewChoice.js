import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'

function CreateNewChoice(props) {

    const [file, setFile] = useState({})
    const handleChangeForFile = (e) => {
        e.preventDefault();
       
        setFile(e.target.files[0])
      
    }
    const createNewChoice = async() => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": 'multipart/form-data',
                'Accept': '*/*',
                
            }
            
          }
        
        await axios.post(`https://myteahousetlv.herokuapp.com/api/choice/create-choice`, {
            title: refInput.current.value,
            description: ref.current.value,
            file
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
          <button onClick={() => createNewChoice()} className='btn-create-new-cat'>Create Choice</button>   
      </div>
       
    </div>
    
  </div>
  )
}

export default CreateNewChoice