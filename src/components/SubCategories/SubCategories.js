import axios from 'axios'
import React, { useEffect, useState} from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import './SubCategories.css'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import {Navigation, Pagination, Scrollbar} from 'swiper'
import 'swiper/css/pagination';
import 'swiper/css';
import CreateSubCategoryPopUp from '../Popup/CreateSubCategoryPopUp';
import UpdateOrDeleteSubCategoryPopUp from '../Popup/UpdateOrDeleteSubPopUp';
function SubCategories() {
    const {id} = useParams();
    const [subs, setSubs] = useState({});
    const navigation =  useNavigate();
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const getCategory = async() => {
        
            await axios.get(`https://myteahousetlv.herokuapp.com/api/category/fetch-category/${id}`)
                            .then(response => {
                                const subCategories = response.data.subCategories;
                                setSubs(subCategories);
                            });
    }
    useEffect(() => {
            getCategory();
    }, [])
    
    let subCats;
    if(subs != null){
        subCats = Object.values(subs);
    }
    let i = 0;
    const miniPhotos = [];
        
        subCats.forEach(item => {
            item.products.forEach(product => {
                miniPhotos[i] = product;
                i++;  
            })
        })
        
        const SwiperButtonNext = ({ children }) => {
            const swiper = useSwiper();
            return <button className='btnPrevNext' onClick={() => swiper.slideNext()}>{children}</button>;
          };  
          const SwiperButtonPrev = ({ children }) => {
            const swiper = useSwiper();
            return <button className='btnPrevNext' onClick={() => swiper.slidePrev()}>{children}</button>;
          };  
          const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false)
          const togglePopUpCreate = () => {
              setTrueOrFalseBtn(!trueOrFalseBtn);
              
             
          }
          const [trueOrFalseBtnUpdate, setTrueOrFalseBtnUpdate] = useState(false)
          const togglePopUpUpdate = () => {   
            setTrueOrFalseBtnUpdate(!trueOrFalseBtnUpdate)
        }
return (
    <div>
    
       <div className='big-container'>
           { 
            subCats.map(item => (
                <div key={item?._id} className="details">
                    
                    <div className="main-img">
                    
                   
                    
                        <img onClick={() => navigation(`/api/subcategories/fetch-subcategory/${item._id}`)} src={item?.subCategoryPhoto?.fileType 
                    ? 
                `data:${item?.subCategoryPhoto?.fileType};base64, 
                ${item?.subCategoryPhoto?.image?.data?.toString('base64')}` 
                : null} alt="" />
                    
                    
                    </div>
                    
                     <div className="mini-container">
                        <div className="row">
                            <h2 onClick={() => navigation(`/api/subcategories/fetch-subcategory/${item._id}`)}>{item.title}</h2>
                            <p>{item.description}</p>
                           
                            
                              
                            <div className="mini-photos">
                                                    
                            <Swiper modules={[Navigation, Pagination, Scrollbar]}
                                    slidesPerView={1}
                                    navigation

                                    >
                                    
                                    <SwiperButtonNext>
                                 <MdChevronRight size={25} />
                                       
                                        </SwiperButtonNext>
                                       
                                { 
                                    item.products.map(product =>
                                        (
                                            // <div key={product._id}>
                                               <SwiperSlide key={product._id}>
                                                <div className='mini-photos-swipe'>
                                                <img style={{cursor: 'pointer'}} onClick={() => navigation(`/api/product/fetch-one-product/${product?._id}`)} src=
                                                    {product?.productPhoto?.fileType 
                                                        ? 
                                                    `data:${product?.productPhoto?.fileType};base64, 
                                                    ${product?.productPhoto?.image?.data?.toString('base64')}` 
                                                    : null
                                                } alt="" />
                                                </div>
                                                </SwiperSlide>
                                            // </div>
                                        )) 
                                }
                                <SwiperButtonPrev>
                                    <MdChevronLeft size={25} />
                                    </SwiperButtonPrev>
                                 </Swiper>
                                </div>
                              
                        </div>
                        <button style={{marginTop: '65px'}} onClick={() => navigation(`/api/subcategories/fetch-subcategory/${item._id}`)} className='btn'>This Products</button>
                        {user?.isAdmin ? (
                            <div className='admin-buttons'>
                                    <button onClick={togglePopUpUpdate}>Update This SubCategory</button>
                                    <button onClick={togglePopUpUpdate}>Delete This SubCategory</button>
                                    {trueOrFalseBtnUpdate && <UpdateOrDeleteSubCategoryPopUp handleClose={togglePopUpUpdate} id={item?._id}/>}
                            </div>
                           
                        ) : null}
                    </div>
                   
                </div>
                       
            ))
           }
            
</div>
                    
          <div className="create-sub-div">
          <button onClick={togglePopUpCreate}>Create SubCategory in This Category</button>
           {trueOrFalseBtn && <CreateSubCategoryPopUp id={id} handleClose={togglePopUpCreate}/>}
          </div>
         
       </div>
  )
}

export default SubCategories