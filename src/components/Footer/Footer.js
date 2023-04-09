import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const allCategories = async() => {
        await axios.get('https://myteahousetlv.herokuapp.com/api/category/fetch-all-categories', {mode: 'cors'})
                        .then(res => setCategories(res.data));
    }
    const allSubs = async() => {
        await axios.get('https://myteahousetlv.herokuapp.com/api/subcategories/fetch-all-subcategories', {mode: 'cors'})
                        .then(res => setSubs(res.data))
    }
    let cats = [];
    useEffect(() => {
        allCategories();
    }, [])

    if(categories)
        cats = Object.values(categories);
    let subCats = [];
    useEffect(() => {
         allSubs();
    }, [])
    
    if(subs)
        subCats = Object.values(subs);

  return (
    <div className='main-footer-div'>
        <footer className="footer">
            <div className="footer__addr">
                <h1 className="footer__logo">Tea House</h1>
        
                    <h2>Contact</h2>
    
                <address>
                    <p>0547962374</p>
                    <p>המנורה, 24 תל אביב</p>
                   
          
                    <a className="footer__btn" href="teahouse.tlv@gmail.com">Email Us</a>
                 </address>
        </div>
  
  <ul className="footer__nav">
    <li className="nav__item">
      <h2 className="nav__title">Media</h2>

      <ul className="nav__ul">
        <li>
          <Link target="_blank" href="https://wa.me/message/YR2HIE5KF5HEB1">WhatsApp</Link>
        </li>

        <li>
          <Link target="_blank" href="https://t.me/teahouse_tlv">Telegram</Link>
        </li>
            
        <li>
          <Link target="_blank" href="https://www.instagram.com/invites/contact/?i=hankfgrgy3i8&utm_content=nab5gi9">Instagram</Link>
        </li>
        <li>
          <Link target="_blank" href="https://facebook.com/teahouse.tlv?mibextid=LQQJ4d">Facebook</Link>
        </li>
      </ul>
    </li>
    
    <li className="nav__item">
      <h2 className="nav__title">Categories</h2>
        {cats.map(item => (
             <ul key={item?._id} className="nav__ul nav__ul--extra">
                 <li>
                    <a href={`/api/category/fetch-category/${item?._id}`}>{item?.title}</a>
                </li>
            </ul>
        ))}
     
    </li>
    
    <li className="nav__item">
      <h2 className="nav__title">SubCategories</h2>
      {subCats.map(item => (
            <ul key={item?._id} className="nav__ul">
                <li>
                <a href={`/api/subcategories/fetch-subcategory/${item?._id}`}>{item?.title}</a>
                </li>
            </ul>
      ))}
    
    </li> 
  </ul>
  
  <div className="legal">
    <h5>&copy; 2023 Tea House. All rights reserved.<br /> Made By <Link href="https://www.facebook.com/blinov.arthur">Arthur Blinov</Link></h5>
    
    
  </div>
    </footer>
    </div>
  )
}

export default Footer