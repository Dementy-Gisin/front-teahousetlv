import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';

function UpdateOrDeleteSubPopUp(props) {
    const ref = useRef(null);
    const refInput = useRef(null);
    const [text, setText] = useState('');
  console.log(props);
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

    
    const updateSubCategory = async() => {
        const updatedTitle = refInput.current.value;
        const updatedDescription = ref.current.value;
       
        await axios.put(`https://myteahousetlv.herokuapp.com/api/subcategories/update-subcategory/${props.id}`, {
            title: updatedTitle,
            description: updatedDescription

        })
    }
    const deleteSubCategory = async() => {
        await axios.delete(`https://myteahousetlv.herokuapp.com/api/subcategories/delete-subcategory/${props.id}`)
    }
    const handleChangeForFile = (e) => {
        e.preventDefault();
       
        setFile(e.target.files[0])
      
      }
    const updateSubCategoryPhoto = async() => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": 'multipart/form-data',
                'Accept': '*/*',
                
            }
            
          }
        await axios.put(`https://myteahousetlv.herokuapp.com/api/subcategories/update-subcat-photo/${props?.id}`, {
            subCategoryPhoto: file
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
        
                  
         
          
      
      <div>
              
            <button onClick={() => updateSubCategory()} className='btn-update'>Update</button>   
            <button onClick={() => deleteSubCategory()} className='btn-delete'>Delete</button>
            <button onClick={() => updateSubCategoryPhoto()} className='btn-update'>Update SubCategory Photo</button>
      </div>
       
    </div>
    
  </div>
  )
}

export default UpdateOrDeleteSubPopUp