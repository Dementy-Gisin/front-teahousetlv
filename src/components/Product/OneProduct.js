import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import './OneProduct.css';
import Comments from '../Comments/Comments';
import ProductUpdateDeletePopUp from '../Popup/ProductUpdateDeletePopUp';
function OneProduct({_id}) {
   
    const {id} = useParams();
    const [prod, setProd] = useState();
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const getOneProduct = async() => {
            await axios.get(`https://myteahousetlv.herokuapp.com/api/product/fetch-one-product/${id ? id : _id}`, {mode: 'cors'})
                            .then(response => {
                                const product = response.data;
                                    setProd(product);
                            })
    }
    useEffect(() => {
        getOneProduct();
    }, [])
    const [trueOrFalse, setTrueOrFalse] = useState(false);
    const togglePopUpUpdateOrDelete = () => {
        setTrueOrFalse(!trueOrFalse);
        
       
    }
    return (
        <div className='main-div-one-product'>
            
            <div className="content-prod">
            <div className="image-prod-div">
                <img className='img-prod' src={prod?.productPhoto?.fileType 
                    ? 
                `data:${prod?.productPhoto?.fileType};base64, 
                ${prod?.productPhoto?.image?.data?.toString('base64')}` 
                : null} 
                alt=""/>
            </div>
            
            <div className="prod-body">
            <h3 className='prod-title'>{prod?.title}</h3>
            <p className='prod-description'>{prod?.description}</p>
            <button className='button-prod'>Buy Now</button>
            </div>
            <div className='card-item-prod'>
                    
            </div>
            
        </div>
        <Comments props={prod}/>
        {user?.isAdmin ? (
            <div className='admin-prod-btn'>
                <button style={{marginBottom: '15px'}} onClick={togglePopUpUpdateOrDelete}>Update Product</button>
                <button onClick={togglePopUpUpdateOrDelete}>Delete Product</button>
                {trueOrFalse && <ProductUpdateDeletePopUp handleClose={togglePopUpUpdateOrDelete} id={id}/>}
            </div>
        ) : null}
        
            </div>
           
  )
}

export default OneProduct