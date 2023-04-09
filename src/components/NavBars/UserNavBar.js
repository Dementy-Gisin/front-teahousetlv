import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logoBej from '../../logos/logoBej.png';
import { Link } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa';
import './UserNavBar.css'
import axios from 'axios';
import SecondUserNavBar from './SecondUserNavBar';
function UserNavBar() {
    
    const [show, handleShow] = useState(false);
    const navigation = useNavigate();
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const cartText = localStorage.getItem('Basket');
    let cart;
    const [products, setProducts] = useState([]);
    const [prod, setProd] = useState('');
    const [trueOrFalse, setTrueOrFalse] = useState(true);

    const fetchProducts = async() => {
        
        await axios.get('https://myteahousetlv.herokuapp.com/api/product/fetch-products', {
              mode: 'cors'  
        }).then(res => {
                setProducts(res.data);
              
        })
    }
    useEffect(() => {
        fetchProducts();
    }, [])
   
    const comparingWords = () => {
        let count = 0;
            products.map(p => {
                if(p.title == prod){
                    
                    
                    navigation(`/api/product/fetch-one-product/${p._id}`);
                    ++count;
                }
                
            })
        
        if(count === 0){
            setTrueOrFalse(false);
        }
        
    }
    
    const NothingFound = () => {
        const stylesH1 = {
            color: 'whitesmoke',
            cursor: 'pointer',
           
        }
        return(
            <div>
                <nav className='usernavbar' id='usernavbar'>
        
        <Link className='link' to='/' onClick={() => setTrueOrFalse(true)}>
                     <img id='logo-bej' style={{width:'120px', height: '40px'}} src={logoBej}  alt=''/>
        </Link>
        
        <h1 style={stylesH1} onClick={() => setTrueOrFalse(true)}>Nothing Found</h1>
        </nav>
                
            </div>
        )
    }
    if(cartText != 'undefined'){
            cart = JSON.parse(cartText);
            
        }
    const transitionNavBar = () => {
        if(window.scrollY > 100){
            handleShow(true);
        }else{
            handleShow(false);
        }
    }
    const logout = () => {
        localStorage.removeItem('user');
        navigation('/')
    }
   
    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])
   
      const Callto = ({ phone, children }) => {
        return <a className='link' href={`tel:${phone}`}>{children}</a>;
      };
      const [navOpen, setNavOpen] = useState(false);
      const ButtonForChat = () => {
         return (
            <div>
                
                <div className='animated-chat'>
               
              <Link style={{textDecoration: 'none'}} to='/chat'>
                <h2 style={{color: 'white'}}>Chat</h2>
              </Link>
                 
                    
            </div>
            </div>
            
            
        )
      }
     
  return (
    <div className='nav'>
        {trueOrFalse ? 
        <nav className='usernavbar' id='usernavbar'>
        
        <Link className='link' to='/'>
                     <img id='logo-bej' style={{width:'120px', height: '40px'}} src={logoBej}  alt=''/>
        </Link>

        <div className="input-div">
            <form onChange={e => e.preventDefault()}>
            <input placeholder='type by name' type="text" className="input-navbar" onChange={(e) => {
                e.preventDefault()
                setProd(e.target.value);
            }} />
            <button className='input-button' type='submit' onClick={comparingWords}>Search</button>
            </form>
        </div>
        <div>
            <ul style={{display: 'flex'}} className={navOpen ? 'navbar activation' : 'navbar'}>
                <li className='li-nav'>
                {
                    user?.isAccountVerified ?
                    <Link className='link' to={`/api/user/profile/${user.id}`}>
                        My Profile
                    </Link> 
                    : null
                }
                </li>
              
                <li className='li-nav'> 
                    {
                     cart 
                     ? 
                     <Link className='link' style={{textDecoration: 'none',  color: '#FFFAF0', cursor: 'pointer'}} to={`/api/basket/fetch-basket/${cart?.data?._id}`}>
                     <FaShoppingCart color='white' fontSize='32px'/> 
                       
                    </Link> 
                    : 
                    <div className='link'>
                            <FaShoppingCart color='black' fontSize='32px'/> 
                                   
                    </div>
                    }
                </li>
               
                   
                {
                     !user?.isAccountVerified 
                     ?
                     <li className='li-nav'> <Link className='link' to='/api/user/register' style={{color: '#eae3d1', textDecoration: 'none'}}>SignIn</Link></li>
                    :
                    <li className='li-nav' style={{textDecoration: 'none', fontSize: '1.3rem', fontWeight: 600, color: '#fff'}} onClick={() => logout()}>LogOut</li>
                }
               
                <li className='li-nav'> {user?.isAccountVerified ? <ButtonForChat/> : null}</li>
                
            </ul>
        </div>
       

        <div id='mobile'>
       
        <label htmlFor='check' className={!navOpen ? 'my-button' : 'my-button clicked'} >
                                <input onClick={() => {setNavOpen(!navOpen)}} type="checkbox" id='check'/>
                                <span></span>
                                <span></span>
                                <span></span>
                            </label>  
        
        </div>
        </nav>
        : <NothingFound/>}

        <SecondUserNavBar/>
     
    </div>
   
  )
}

export default UserNavBar