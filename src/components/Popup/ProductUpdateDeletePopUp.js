import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'

function ProductUpdateDeletePopUp(props) {

    const updateProductInThisSubCategory = async() => {
        await axios.put(`https://myteahousetlv.herokuapp.com/api/product/update-one-product/${props?.id}`, {
            title: refInput.current.value,
            description: ref.current.value,
            price: priceRef.current.value,
            weight: weightRef.current.value
        }).then(res => console.log(res.data))
    }
    const updateProductPhotoInThisSubCategory = async() => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": 'multipart/form-data',
                'Accept': '*/*',
                
            }
            
          }
        await axios.put(`https://myteahousetlv.herokuapp.com/api/product/update-product-photo/${props?.id}`, {
            productPhoto: file
        }, config).then(res => console.log(res.data))
    }
    const deleteProductInThisSubCategory = async() => {
        await axios.delete(`https://myteahousetlv.herokuapp.com/api/product/delete-product/${props?.id}`, {
            
        }).then(res => console.log(res.data))
    }
    const ref = useRef('');
    const refInput = useRef('');
    const priceRef = useRef('');
    const weightRef = useRef('');
    const [text, setText] = useState('');
    const [file, setFile] = useState({}) 
    const handleChange = (e) => {
        e.preventDefault();
        if(!text){
            setText(props?.content?.description)
        }
        else{
            setText(e.target.value)
        }
        
    }
    const handleChangeForFile = (e) => {
        e.preventDefault();
       
        setFile(e.target.files[0])
      
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
        <input placeholder='photo' type="file" onChange={handleChangeForFile}/>
        <input placeholder='price' className='wrapp-input' type="text" ref={priceRef}/>
        <input placeholder='weigth' className='wrapp-input' type="text" ref={weightRef}/>
      </div>
        
                  
         
          
      
      <div>
              
            <button onClick={() => updateProductInThisSubCategory()} className='btn-update'>Update</button>   
            <button onClick={() => deleteProductInThisSubCategory()} className='btn-delete'>Delete</button>
            <button onClick={() => updateProductPhotoInThisSubCategory()}>Update Product Photo</button>
      </div>
       
    </div>
    
  </div>
  )
}

export default ProductUpdateDeletePopUp