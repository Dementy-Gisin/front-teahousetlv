import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import './CreateSubCategoryPopUp.css';
function CreateSubCategoryPopUp(props) {

    const createSubCategoryInThisCategory = async() => {
        await axios.post(`https://myteahousetlv.herokuapp.com/api/subcategories/create-subcategory/${props?.id}`, {
            title: refInput.current.value,
            description: ref.current.value
        })
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
      </div>
        
                  
         
          
      
      <div>
          <button onClick={() => createSubCategoryInThisCategory()} className='btn-create-new-cat'>Create SubCategory</button>   
      </div>
       
    </div>
    
  </div>
  )
}

export default CreateSubCategoryPopUp