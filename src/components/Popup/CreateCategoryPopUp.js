import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

function CreateCategoryPopUp(props) {

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
    const createNewCategory = async() => {
            const title = refInput.current.value;
            const description = ref.current.value;
           
            await axios.post('https://myteahousetlv.herokuapp.com/api/category/create-category', {
                title: title,
                description: description
            })
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
        <button onClick={() => createNewCategory()} className='btn-create-new-cat'>Create</button>   
    </div>
     
  </div>
  
</div>
  )
}

export default CreateCategoryPopUp