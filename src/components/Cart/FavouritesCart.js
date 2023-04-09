import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FavouritesCart.css';

function FavouritesCart({props}) {
    const [isOpen, setIsOpen] = useState(false);
    const refresh = () => window.location.reload(true);
    const {id} = useParams();
    const navigation = useNavigate();
    const [selected, setSelected] = useState(0);
   const [indexForSelected, setIndexForSelected] = useState(0);
   const handleSelected = (e, index) => {
            e.preventDefault();
            setSelected(e?.target?.value);
            setIndexForSelected(index);
   }
  return (
    <div>
             <div onClick={() => setIsOpen(!isOpen)} className='img-cart-of-fav'>
             <div className="heart">
                                    <img src={props?.productPhoto?.fileType 
                                                ? 
                                            `data:${props?.productPhoto?.fileType};base64, 
                                            ${props?.productPhoto?.image?.data?.toString('base64')}` 
                                            : 
                                            null} 
                                    alt="" />
                            </div>        
                            </div>
                            {isOpen && 
                            
                            <motion.div className="details-cart-of-favs">
                                <div className='title-cart'>
                                    {props.title}
                                </div>
                                <div className="price-cart">
                                <p style={{color: 'green', marginRight: '25%'}}>price: <strong style={{display: 'flex', color: 'brown', fontSize: '16px', fontWeight: '600', marginLeft: '70%'}}>{selected ? Number(props?.price * (selected / props?.weight)).toFixed(2) : props?.price}</strong></p>
                                </div>
                                <div style={{color: 'brown'}} className="weight-cart">
                                <select className="drop-down" onChange={(e) => handleSelected(e)}>
                                            <option value={props?.weight}>{props?.weight}</option>
                                            <option value={props?.weight * 2}>{props?.weight * 2}</option>
                                            <option value={props?.weight * 4}>{props?.weight * 4}</option>
                                            <option value={props?.weight * 6}>{props?.weight * 6}</option>
                                            <option value={props?.weight * 8}>{props?.weight * 8}</option>
                                </select>
                                   
                                </div>
                                
                                </motion.div>
                                }
                                {
                                     <div className="buttons-cart">
                                     <button className="cart-btn-in-div favorite">To Favorites</button>
                                     <button className="cart-btn-in-div update">Update Details</button>
                                     <button className="cart-btn-in-div delete">Delete Product</button>
                                     </div>
                                }
                                
                               
                            
                            
                             
    </div>
  )
}

export default FavouritesCart