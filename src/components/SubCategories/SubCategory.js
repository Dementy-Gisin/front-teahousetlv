import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import CreateProductPopUp from '../Popup/CreateProductPopUp';


function SubCategory() {
    const {id} = useParams();
    const [prods, setProds] = useState([]);
    const [description, setDescription] = useState('');
    const [count, setCount] = useState(0);
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    useEffect(() => {
        setCount(cur => cur + 1);
    }, [])
    const getSubCategory = async() => {
            await axios.get(`https://myteahousetlv.herokuapp.com/api/subcategories/fetch-subcategory/${id}`)
                            .then(response => {
                                const prods = response.data.products;
                                setDescription(response.data.description);
                                setProds(prods);
                            });
    }
    useEffect(() => {
            getSubCategory();
    }, [])
    let array;
     
    if(prods != null){
        array = Object.values(prods)
    }
    const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false);
    const togglePopUpCreate = () => {
        setTrueOrFalseBtn(!trueOrFalseBtn);
        
       
    }
   
  return (
   
    <div>
       
        <Product products={array}/>
        {user?.isAdmin ? (
            <div className='admin-div-products'>
                <button className='admin-btn-products' onClick={togglePopUpCreate}>Create Product in This SubCategory</button>
                {trueOrFalseBtn && <CreateProductPopUp handleClose={togglePopUpCreate} id={id}/>}
            </div>
        ) : null}
       
    </div>
   
  )
}

export default SubCategory