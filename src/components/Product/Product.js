import axios from 'axios'
import React, { useEffect, useState, createContext, useRef, useContext, KeyboardEventHandler } from 'react'
import { useParams } from 'react-router-dom'
import './Product.css';
import PopUp from '../Popup/PopUp';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import Creatable from 'react-select/creatable';
function Product({products}){
   
    const {id} = useParams();
    const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false);
    const [createOrUpdate, setCreateOrUpdate] = useState(false);
    const [createdCard, setCreatedCard] = useState({});
    const [count, setCount] = useState(1);
    const [counterForFav, setCounterForFav] = useState(1);
    const counter = useRef();
    const counterFav = useRef();
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const textCart = localStorage.getItem('Basket');
    const cart = JSON.parse(textCart);
    const prodsToBuy = [];
    const [ind, setInd] = useState(-1);
    
        
    const createCardWithFavourites = async(index) => {
        const props = Object.assign({}, products[index])
        const config = {
         headers: {
             "Access-Control-Allow-Origin": "*",
             "Content-Type": "application/json",
              Accept: 'application/json'
         }
             
         }
         if(!user && !cart){
        const card = await axios.post('https://myteahousetlv.herokuapp.com/api/basket/create-basket-without-user', {favouriteProducts: {
             _id: props._id,
             title: props.title,
             description: props.description,
             price: props.price,
             weight: props.weight,
             productPhoto: props.productPhoto
     
         }}, config)
        localStorage.setItem('Basket', JSON.stringify(card))
        setInd(index);
        setCreateOrUpdate(true);
        setCreatedCard(card);
        setCounterForFav(cur => cur + 1);
        counterFav.current = counterForFav;
    }
    }

    
    const updateCardWithFavouriteProducts= async(index) => {
        
        const props = Object.assign({}, products[index])
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: 'application/json'
            }
                
            }
            let flag = false;
            const prods = Object.values(cart?.data?.productsToBuy);
            prods.map(product => {
                    if(product._id == props._id){
                        flag = true;
                        
                            toast.error('The Product Is Already In Cart', {
                            position: toast.POSITION.BOTTOM_CENTER,
                            draggable: true,
                            closeOnClick: true,
                            theme: 'dark'
                          })
                    }
           })
           if(flag === false){
            await axios.put(`https://myteahousetlv.herokuapp.com/api/basket/add-to-basket/${cart?.data._id}`, {favouriteProducts: {
                _id: props._id,
                title: props.title,
                description: props.description,
                price: props.price,
                weight: props.weight,
                productPhoto: props.productPhoto
            }}, config)
            setInd(index);
            setCounterForFav(cur => cur + 1);
            counterFav.current = counterForFav;
        }
           
    }
    const togglePopup = () => {
        setTrueOrFalseBtn(!trueOrFalseBtn);
    }


     
    const Img = ({props, index}) => {
        const cartItemImage = {
            borderRadius: '50%',
            width: '160px',
            height: '160px',
            objectFit: 'cover',
            marginTop: '20px'
           } 
           
        return (
            <div>
                <img
                
                style={cartItemImage}
                className={index === ind ? `animations-cart-item-img` : null}
                src={props?.fileType ? `data:${props?.fileType};base64, ${props?.image?.data?.toString('base64')}` : null}/>
            </div>
        )
       
    }
    const createBuyingCart = async(index) => {
        
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
                'Access-Control-Allow-Credentials': true,
                // 'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json",
                'Accept': 'application/json',
                // 'Access-Control-Request-Method': 'POST'
                // Authorization: `Bearer ${user?.token}`
        }}
        await axios.post('https://myteahousetlv.herokuapp.com/api/basket/create-basket-without-user',{
            productsToBuy: 'hello'
    }, config).then(res => console.log(res.data)).catch(err => console.log(err))
    }
    const PriceWeigthButtons = ({props, index}) => {
    
    const [selectedWeight, setSelectedWeight] = useState(0);
    
    
    const createCardWithBuying = async(index) => {
  
       const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
          
        }
            
        }
        
        if(!user && !cart){
        
        const card = await axios.post('https://myteahousetlv.herokuapp.com/api/basket/create-basket-without-user', 
           
            {props}
       
        )
       
        localStorage.setItem('Basket', JSON.stringify(card))
        
        setCreatedCard(card)
        
        setCreateOrUpdate(true);
        setCount(cur => cur + 1);
        counter.current = count;
        setInd(index);
    }
       
        else{
            updateCardWithProductsToBuy();
        }
    
    }
    const updateCardWithProductsToBuy = async(index) => {
        
        const props = Object.assign({}, products[index])
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                mode: 'cors'
            }
                
            }
            let flag = false;
            const prods = Object.values(cart?.data?.productsToBuy);
            prods.map(product => {
                    if(product._id == props._id){
                        flag = true;
                        
                            toast.error('The Product Is Already In Cart', {
                            position: toast.POSITION.BOTTOM_CENTER,
                            draggable: true,
                            closeOnClick: true,
                            theme: 'dark'
                          })
                    }
           })
          
           if(flag === false){
            const updatedCart = await axios.put(`https://myteahousetlv.herokuapp.com/api/basket/add-to-basket/${cart?.data?._id}`, {productsToBuy: {
                _id: props._id,
                title: props.title,
                description: props.description,
                price: selectedWeight ? Number(props?.price * (selectedWeight / props?.weight)).toFixed(2) : props?.price,
                weight: selectedWeight ? selectedWeight : props?.weight,
                productPhoto: props.productPhoto
        
            }}, config)
            localStorage.setItem('Basket', JSON.stringify(updatedCart))
            setCount(cur => cur + 1);
            counter.current = count;
            setInd(index);
        }
        
    }
    const options = [
        {value: props.weight, label: props.weight},
        {value: (props.weight * 2), label: props.weight * 2},
        {value: (props.weight * 4), label: props.weight * 4},
        {value: (props.weight * 6), label: props.weight * 6},
        {value: (props.weight * 8), label: props.weight * 8}
    ]
        return (
            <>
            <div className='price-weight'>
            <p style={{color: 'green'}}>
            price: 
            { 
                <strong style={{padding: '5px', color: 'brown', fontSize: '20px', fontWeight: '700'}}>
                    {selectedWeight ? Number(props?.price * (selectedWeight / props?.weight)).toFixed(2) : props?.price}
                </strong>
            }
            </p>
            <div className='drop-down-menu'>
            <Creatable onCreateOption={true} placeholder='Amount' options={options} onChange={(e) => {setSelectedWeight(e.value)}} />
               
            </div>                   
           
           
                               
                             
        </div>
        <div className="product-description">
        <h5 style={{cursor: 'pointer', marginTop: '10px', marginBottom: '10px'}} onClick={togglePopup}>Push For Details</h5>
            {trueOrFalseBtn && <PopUp handleclose={togglePopup} content={props}/>}
      
    </div>
    <div className="buttonsCart">
        <button style={{color: 'white', background: 'green', margin: '5px'}} className='button-cart1' onClick={() => (createOrUpdate ? updateCardWithProductsToBuy(index) : createBuyingCart(index))}>Add To Buy</button>
        <button style={{color: 'white', background: 'brown', margin: '5px'}} className='button-cart2' onClick={() => createOrUpdate ? updateCardWithFavouriteProducts(index) : createCardWithFavourites(index)}>Add to Favourites</button>
    </div>
    </>
        )
   }
   
  return (
    <>
   {products.map((props, index) => 
    <div key={props?._id}>
   
  
    <div className="subCat">
    <hr/>
   <div className='product-container'>
        <div className='cartItem'>
            <Link style={{textDecoration: 'none', color: 'white'}}>

            </Link>
        <Link to={`/api/product/fetch-one-product/${props._id}`}>
             <Img props={props.productPhoto} index={index}/>
          
            
        </Link>
           <div className='cartItemDetails'>
                <div className='cartTitle' style={{fontSize:'30px'}}>
                    <h4>{props.title}</h4>
                </div>
                <PriceWeigthButtons props={props} index={index}/>
                
                
                
            </div>
        </div>
        
   </div>
       
   </div>
  
   </div>
    )}
   
   </>
  )
}

export default Product
