import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import './SecondUserNavBar.css';

function SecondUserNavBar() {

    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const navigation = useNavigate()
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

    let subCats;
    useEffect(() => {
         allSubs();
    }, [])
    
    if(subs)
        subCats = Object.values(subs);
       
     
    const ShowCategories = () => {
      
        return (
            <div>

            {cats.map(item =>(  
                
                <div key={item?._id}>
                  <a  href={`/api/category/fetch-category/${item?._id}`}>
                    {item?.title}
                    </a>
                </div>
                
               
           
            ))}
            </div>
           
        )
    }
    const ShowSubCategories = () => {
        return (
            <div>

            {subCats.map(item => (  
            
                <a key={item?._id} href={`/api/subcategories/fetch-subcategory/${item?._id}`}>{item?.title}</a>
               
           
            ))}
            </div>
           
        )
    }
    const Callto = ({ phone, children }) => {
        return <a className='link' href={`tel:${phone}`}>{children}</a>;
      };
    const [open, setOpen] = useState(false);
    const [secNavOpen, setSecNavOpen] = useState(false);
  return (
  
    <div className='main-div-second-navbar'>
<div className="second-navbar">
 
  
 

 
 
 

<div className={secNavOpen ? 'second-navbar-open active' : 'second-navbar-open'}>

<div className="nav-links">
   <Link to="/">Home</Link>
   

  
   <div className="second-navbar-dropdown">
     <Link className="dropBtn" to="/details">About
     </Link>
     <div className="second-navbar-drop-content">
        <Link to='Details'>Details</Link>
        <Link to='/about-us'>About Us</Link>
     </div>
  
   </div>
   
   
   <div className="second-navbar-dropdown">
    
     <Link className="dropBtn" to="/">Categories
    </Link>
    
               
               
    <div className="second-navbar-drop-content">
        <ShowCategories/>
    </div> 
    

   </div>
   <div className="second-navbar-dropdown">
     <Link className="dropBtn" to="/">SubCategories
     </Link>
     <div className="second-navbar-drop-content">
        <ShowSubCategories/>
     </div>
  
   </div>
   <div className="item-for-nav">
                <div  style={{color: '#eae3d1'}} className="menu-trigger" onClick={() => {setOpen(!open)}}>
                <Link>Social</Link>
                </div>
                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                    <ul style={{listStyleType: 'none'}}>
                        <li className="dropdownitem">
                          <SocialIcon bgColor="#2e4f24" url="https://t.me/teahouse_tlv"/>
                          <SocialIcon bgColor="#2e4f24" url="https://wa.me/message/YR2HIE5KF5HEB1"/>
                        </li>
                       
                        <li className="dropdownitem">
                          <SocialIcon bgColor="#2e4f24" url="https://facebook.com/teahouse.tlv?mibextid=LQQJ4d"/>
                          <SocialIcon bgColor="#2e4f24" url="https://www.instagram.com/invites/contact/?i=hankfgrgy3i8&utm_content=nab5gi9"/>
                        </li>
                       
                           
                    </ul>
                </div>
            </div>
   <Callto phone="+972543098002">Call Me</Callto>
   
   
 </div>
</div>
<div className="nav-btn">
   <label forhtml="nav-check">
    <input onClick={() => {setSecNavOpen(!secNavOpen)}} type="checkbox" id="nav-check"/>
    
     <span></span>
     <span></span>
     <span></span>
   </label>
 </div>

    </div>
    
   
  </div>

  
    
  )
}

export default SecondUserNavBar;