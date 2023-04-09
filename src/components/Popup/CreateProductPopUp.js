import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';

function CreateProductPopUp(props) {

    const createProductInThisSubCategory = async() => {
        await axios.post(`https://myteahousetlv.herokuapp.com/api/product/create-product/${props?.id}`, {
            title: refInput.current.value,
            description: ref.current.value,
            price: priceRef.current.value,
            weight: weightRef.current.value
        }).then(res => console.log(res.data))
    }
    const ref = useRef('');
    const refInput = useRef('');
    const priceRef = useRef('');
    const weightRef = useRef('');
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
          <textarea placeholder='description' className='textarea' ref={ref} onChange={e => handleChange(e)} 
          value={text}
          />
          <input placeholder='title' className='wrapp-input' type="text" ref={refInput}/>
          <input placeholder='price' className='wrapp-input' type="text" ref={priceRef}/>
          <input placeholder='weigth' className='wrapp-input' type="text" ref={weightRef}/>
      </div>
        
                  
         
          
      
      <div>
          <button onClick={() => createProductInThisSubCategory()} className='btn-create-new-cat'>Create Product</button>   
      </div>
       
    </div>
    
  </div>
  )
}

export default CreateProductPopUp