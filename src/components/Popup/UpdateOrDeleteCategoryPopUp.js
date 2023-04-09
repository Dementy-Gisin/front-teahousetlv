import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';

function UpdateOrDeleteCategoryPopUp(props) {

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

    
    const updateCategory = async() => {
        const updatedTitle = refInput.current.value;
        const updatedDescription = ref.current.value;
        await axios.put(`https://myteahousetlv.herokuapp.com/api/category/update-category/${props.id}`, {
            title: updatedTitle,
            description: updatedDescription

        })
    }
    const deleteCategory = async() => {
        await axios.delete(`https://myteahousetlv.herokuapp.com/api/category/delete-category/${props.id}`)
                    .then(res => console.log(res.data))
        console.log(props.id);
    }
    const handleChangeForFile = (e) => {
        e.preventDefault();
       
        setFile(e.target.files[0])
      
      }
    const updateCategoryPhoto = async() => {
        
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": 'multipart/form-data',
                'Accept': '*/*',
                
            }
            
          }
        await axios.put(`https://myteahousetlv.herokuapp.com/api/category/update-category-photo/${props?.id}`, {
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
        <input type="file" onChange={handleChangeForFile}/>
      </div>
        
                  
         
          
      
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
              
            <button onClick={() => updateCategory()}>Update</button>   
            <button onClick={() => deleteCategory()}>Delete</button>
            <button onClick={() => updateCategoryPhoto()}>Update Category Photo</button>
      </div>
       
    </div>
    
  </div>
  )
}

export default UpdateOrDeleteCategoryPopUp