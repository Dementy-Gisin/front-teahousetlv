import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ChoiceUpdateDeletePopUp from '../Popup/ChoiceUpdateDeletePopUp';
import './OneChoice.css';

function OneChoice({_id}) {
   
    const {id} = useParams();
    const [prod, setProd] = useState();
    const getOneProduct = async() => {
            await axios.get(`https://myteahousetlv.herokuapp.com/api/choice/fetch-choice/${id ? id : _id}`, {mode: 'cors'})
                            .then(response => {
                                const product = response.data;
                                    setProd(product);
                            })
    }
    useEffect(() => {
        getOneProduct();
    }, [])
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false);
    const togglePopUpUpdate = () => {
        setTrueOrFalseBtn(!trueOrFalseBtn);
        
       
    }
    return (
        <div className='main-div-one-product'>
           
            <div className="content-prod">
            <div className="image-prod-div">
                <img className='img-prod' src={prod?.choicePhoto?.fileType 
                    ? 
                `data:${prod?.choicePhoto?.fileType};base64, 
                ${prod?.choicePhoto?.image?.data?.toString('base64')}` 
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
        {user?.isAdmin ? (
            <div className='admin-prod-btn'>
                <button style={{marginBottom: '15px'}} onClick={togglePopUpUpdate}>Update Product</button>
                <button onClick={togglePopUpUpdate}>Delete Product</button>
                {trueOrFalseBtn && <ChoiceUpdateDeletePopUp handleClose={togglePopUpUpdate} id={id}/>}
            </div>
        ) : null}
        
        
            </div>
           
  )
}

export default OneChoice