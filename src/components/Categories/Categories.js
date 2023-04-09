import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Categories.css'
import {AnimatePresence, motion} from 'framer-motion';
import {BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill} from 'react-icons/bs'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import {Navigation, Pagination, Scrollbar} from 'swiper'
import 'swiper/css/pagination';
import 'swiper/css';
import CreateCategoryPopUp from '../Popup/CreateCategoryPopUp';
import UpdateOrDeleteCategoryPopUp from '../Popup/UpdateOrDeleteCategoryPopUp';

function Categories() {
    
    
    
    const [cat, setCat] = useState([]); 
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const navigation = useNavigate();
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const fetchCategories = async() => {
           
        await axios.get('https://myteahousetlv.herokuapp.com/api/category/fetch-all-categories', {mode:'cors'})
                                                .then((response) => {
                                                    const categories = response.data;
                                                    setCat(categories);
                                                })
     }
    useEffect(() => {
        fetchCategories();
    }, [])
    let array; 
    let photoIndex;
    if(cat != null){
        array = Object.values(cat)
        photoIndex = array.length-1;
    }
   
    const nextStep = () => {
        setDirection(1);
        if(index === array?.length-1){
            setIndex(0)
            return
        }
       setIndex(index + 1);
    }
    const prevStep = () => {
        setDirection(-1);
        if(index === 0){
            setIndex(array?.length - 1)
            return
        }
       setIndex(index - 1);
    }
    const variants = {
        initial: direction => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.5
            }
           
        },
        animate: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: {type: 'spring', stiffness: 300, damping: 30},
                opacity: {duration: 0.2}
            }
        },
        exit: direction => {
            return {
                x: direction > 0 ? -1000 : 1000,
                opacity: 0,
                transition: {
                    x: {type: 'spring', stiffness: 300, damping: 30},
                    opacity: {duration: 0.2}
                }
            }
           
        }
    }
    const [subcategories, setSubcategories] = useState([]);

    const fetchAllSubCategories = async() => {
        await axios.get('https://myteahousetlv.herokuapp.com/api/subcategories/fetch-all-subcategories', {mode: 'cors'})
                        .then(res => setSubcategories(res.data));
        
    }
    useEffect(() => {
        fetchAllSubCategories();
    }, [])
    let subs;
    if(subcategories){
        subs = Object.values(subcategories);
    }
    const SwiperButtonNext = ({ children }) => {
        const swiper = useSwiper();
        return <button style={{marginTop: '40px',float: 'right'}} className='btnPrevNext' onClick={() => swiper.slideNext()}>{children}</button>;
      };  
      const SwiperButtonPrev = ({ children }) => {
        const swiper = useSwiper();
        return <button style={{marginTop: '40px', float: 'left'}} className='btnPrevNext' onClick={() => swiper.slidePrev()}>{children}</button>;
      };
    const [allProducts, setAllProducts] = useState([]);  
    const fetchAllProducts = async() => {
        await axios.get('https://myteahousetlv.herokuapp.com/api/product/fetch-products', {mode: 'cors'})
                        .then(res => setAllProducts(res.data));
    }
    useEffect(() => {
        fetchAllProducts()
    }, [])
    let prods;
    if(allProducts){
        prods = Object.values(allProducts);
    }
    
    const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false);
    const [trueOrFalseBtnUpdate, setTrueOrFalseBtnUpdate] = useState(false)
    const togglePopUpCreate = () => {
        setTrueOrFalseBtn(!trueOrFalseBtn);
        
       
    }
    const togglePopUpUpdate = () => {   
        setTrueOrFalseBtnUpdate(!trueOrFalseBtnUpdate)
    }
  return (
    <div> 
      
                
                       
                            
            <div className="container-categories">
            
            
            
            <div className="slideshow" key={index}> 
           
            
           <BsFillArrowLeftSquareFill size='35%' color='#2e4f24' onClick={prevStep} className='button prevButton'/>
           <BsFillArrowRightSquareFill size='35%' color='#2e4f24' className='button nextButton' onClick={nextStep}/>
           <div>
           
            
            <AnimatePresence initial={false} custom={direction}>
           {
            
               array[index]?.categoryPhoto?.fileType ? 
               <Link to={`/api/category/fetch-category/${array[index]?._id}`}>
                   <motion.img
               src={`data:${array[index]?.categoryPhoto?.fileType};base64, ${array[index]?.categoryPhoto?.image?.data?.toString('base64')}`} 
               alt="slides" className='slides'
               variants={variants}
               animate='animate'
               initial='initial'
               exit='exit'
               key={array[index]?._id}
               custom={direction}/>
               </Link>
               : null
              
           }
           <div className='titleSubs'><p>{array[index]?.title}</p></div>
           </AnimatePresence>
           </div>
                     
            </div>
            
        </div>
        <div className='div-for-description'>
            <h2 className='name-of-description'>Description Of Category</h2>
           <div className='categories-description'>{array[index]?.description}
           <Link to={`/api/category/fetch-category/${array[index]?._id}`}>
            <button className='btn-categories-desc'>Go To Category</button>
           </Link>
           </div>
           {user?.isAdmin ? (
                <div className='div-for-admin-buttons'>
                    <button onClick={togglePopUpCreate}>Create New Category</button>
                    {trueOrFalseBtn && <CreateCategoryPopUp handleClose={togglePopUpCreate}/>} 
                    <button onClick={togglePopUpUpdate} style={{backgroundColor: 'burlywood'}}>Update This Category</button>
                    <button onClick={togglePopUpUpdate} style={{backgroundColor: 'red'}}>Delete This Category</button>
                    {trueOrFalseBtnUpdate && <UpdateOrDeleteCategoryPopUp handleClose={togglePopUpUpdate} id={array[index]?._id} title={array[index]?.title} description={array[index]?.description}/>}
                </div>
            ) : null}
            
           </div>
           <div style={{textAlign: 'center'}}>
           <h2 style={{color: 'darkolivegreen', fontSize: '35px'}}>
            SubCategories :     
            </h2>
        <div className='subs-in-categories'>
            {
               
                   
                    <Swiper modules={[Navigation, Pagination, Scrollbar]}
                    slidesPerView={2}
                    >
                       
                        <SwiperButtonPrev>
                    <MdChevronLeft size={35}/>
                    </SwiperButtonPrev>
                     
                    
                    
                       
                { 
                    subs.map(item =>
                        (
                                <SwiperSlide key={item._id}>
                                <div className='swipe-photos'>
                                <img style={{cursor: 'pointer'}} onClick={() => navigation(`/api/subcategories/fetch-subcategory/${item?._id}`)} src=
                                    {item?.subCategoryPhoto?.fileType 
                                        ? 
                                    `data:${item?.subCategoryPhoto?.fileType};base64, 
                                    ${item?.subCategoryPhoto?.image?.data?.toString('base64')}` 
                                    : null
                                } alt="" />
                                </div>
                                </SwiperSlide>
                        )) 
                }
                
                <SwiperButtonNext>
                 <MdChevronRight size={35} />
                       
                        </SwiperButtonNext>
               
               
                 </Swiper>
                    
          
            }
        
        </div>
           </div>
           <div>
                 
        </div>
                        
       
                                          
    </div>
  )
}

export default Categories