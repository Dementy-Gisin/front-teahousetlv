import React, { useEffect, useReducer, useRef, useState } from 'react'
import { filterProps, motion } from 'framer-motion';

import './CartProductsToBuy.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function CartProductsToBuy({props, cardId, index}) {
    
    const [isOpen, setIsOpen] = useState(false);
    const refresh = () => window.location.reload(true);
    const {id} = useParams();
    const navigation = useNavigate();

    const deleteProdFromCart = async() => {
    
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                 Accept: 'application/json',
            }
        }
        
        const updatedCart = await axios.put(`https://myteahousetlv.herokuapp.com/api/basket/product-del-from-basket/${index}`, 
        {
            cardId: id
        }
        , 
        config)
        localStorage.setItem('Basket', JSON.stringify(updatedCart));
        if(updatedCart?.data?.productsToBuy?.length - 1 <= 0){
            await axios.delete(`https://myteahousetlv.herokuapp.com/api/basket/basket-delete/${id}`);
            localStorage.clear();
            navigation('/');
        }
       
        //refresh();
        //
    }
   

  return (
    <div
       
     >
         <motion.div onClick={() => setIsOpen(!isOpen)}  whileHover={{
            rotate: [0,1.4,-1.4,0],
          
            }} 
    className='img-cart-of-prod fade'>
        
                                    <img src={props?.productPhoto?.fileType 
                                                ? 
                                            `data:${props?.productPhoto?.fileType};base64, 
                                            ${props?.productPhoto?.image?.data?.toString('base64')}` 
                                            : 
                                            null} 
                                    alt="" />
                                  
                            </motion.div>
                            {isOpen && 
                            
                            <motion.div className="details-cart-of-prods">
                                <div className='title-cart'>
                                    {props.title}
                                </div>
                                <div className="price-cart">
                                    Price: <strong style={{color: 'green'}}>{props.price}</strong>
                                </div>
                                <div style={{color: 'brown'}} className="weight-cart">
                                    Weight:{props.weight}
                                </div>
                                
                                </motion.div>
                                }
                                {
                                     <div className="buttons-cart">
                                     <button className="cart-btn-in-div favorite">To Favorites</button>
                                     <button className="cart-btn-in-div update">Update Details</button>
                                     <button onClick={deleteProdFromCart} className="cart-btn-in-div delete">Delete Product</button>
                                     </div>
                                }
                                
                               
                            
                            
                             
                            
    </div>
  )
}

export default CartProductsToBuy