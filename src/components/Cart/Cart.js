import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import './Cart.css'
import CartProductsToBuy from './CartProductsToBuy'
import FavouritesCart from './FavouritesCart'


function Cart() {

    
    
    const {id} = useParams();
    const [productsCart, setProductsCart] = useState({});
    const [favouritesCart, setFavouritesCart] = useState({});
    const productsInCart = async() => {

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: 'application/json',
            }
        }
        await axios.get(`https://myteahousetlv.herokuapp.com/api/basket/fetch-basket/${id}`, {

        }, config).then(res => { console.log(res)
                if(res.data?.productsToBuy){
                setProductsCart(res.data?.productsToBuy)
                }
                if(res?.data?.favouriteProducts){
                  setFavouritesCart(res?.data?.favouriteProducts)
                  console.log(favouritesCart);
                }
        });
    } 
    useEffect(() => {
        productsInCart();   
    }, [])
    
    let prods;
    let favourites;
    if(productsCart){
        prods = Object?.values(productsCart);
    }
    if(favouritesCart){
      favourites = Object?.values(favouritesCart);
    }
    console.log(favouritesCart);
  return (
    <div>
      <div className="all-cart-products">
        
        
        {
           prods ? prods.map((item, index) => (
            
                <div className='product-to-buy' key={index}>
                        <CartProductsToBuy props={item} cardId={id} index={index}/>
                </div>
            )) : null
        }
        </div>
        <div className="btn-to-buy-div">
       
       <button className='to-buy-btn'>
                       Buy this products
               </button>
       </div>
       <div className="all-favourite-products">
          {
            favourites ? favourites.map((item, index) => (
                    <div className="favourite-products" key={index}>
                          <FavouritesCart props={item} cardId={id} index={index} />
                    </div> 
            )) : null
          }
       </div>
                    
    </div>
  )
}

export default Cart