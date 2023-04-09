import axios from 'axios';
import React, {useState} from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateNewChoice from '../Popup/CreateNewChoice';
import './ChoiceOfTeaHouseAll.css'
function ChoiceOfTeaHouseAll() {
    const [choices, setChoices] = useState([]);
    const navigation = useNavigate();
    const fetchAllChoices = async() => {
        await axios.get('https://myteahousetlv.herokuapp.com/api/choice/fetch-all-choices', {mode: 'cors'})
                        .then(res => setChoices(res.data));
    } 
    useEffect(() => {
        fetchAllChoices();
    }, [])
  
    let chs;
    if(choices){
      chs = Object.values(choices);
    }
    const [showTheImage, setShowTheImage] = useState(false);
    const [showTheChoice, setShowTheChoice] = useState({});
    const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const showImageFunction = (item) => {
        setShowTheImage(!showTheImage);
        setShowTheChoice(item)
   }
   const leaveTheImage = () => {
    setShowTheImage(!showTheImage)
   }
   const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false);
   const togglePopUpCreateChoice = () => {
        setTrueOrFalseBtn(!trueOrFalseBtn);
        
       
    }
   
  return (
    <div className='main-choice'>
    <h2>Choice of Tea House</h2>
    {user?.isAdmin ? (
      <div>
        <button onClick={togglePopUpCreateChoice} className='createnew-choice-btn'>Create New Choice</button>
        {trueOrFalseBtn && <CreateNewChoice handleClose={togglePopUpCreateChoice}/>}
      </div>
    ) : null}
    {showTheImage ? (
        <div onMouseLeave={leaveTheImage}>
            <div className='main-choice-item-div'>
            <div className='show-the-choice-container'>
                <div className='show-the-choice'>
                    <h3>{showTheChoice.title}</h3>
                    <img onClick={() => navigation(`/api/choice/fetch-choice/${showTheChoice?._id}`)} src={showTheChoice?.choicePhoto?.fileType 
                                    ? 
                                `data:${showTheChoice?.choicePhoto?.fileType};base64, 
                                ${showTheChoice?.choicePhoto?.image?.data?.toString('base64')}` 
                                : null
                            } alt="" />
                </div>
            </div>

        </div>
        </div>
        
       
        
       

    )
    :
    (<div  className='main-choices-div'>
        {chs.map(item => (
      <div key={item?._id} className="choices-item-div">
      <div  className="choices-item-box" onClick={() => navigation(`/api/choice/fetch-choice/${item?._id}`)}>
        <div onMouseOver={() => showImageFunction(item)} className="choices-item-div-photo">
        <img src={item?.choicePhoto?.fileType 
                                    ? 
                                `data:${item?.choicePhoto?.fileType};base64, 
                                ${item?.choicePhoto?.image?.data?.toString('base64')}` 
                                : null
                            } alt="" /> 
        </div>
        <div className="content-choice-div">
          <div>
            <h2>{item?.title}</h2>
            <p>{item?.description}</p>
          </div>
        </div>
      </div>
      </div>
      
    ))}
    
    </div>)
    }
 
</div>
   
   
  )
}

export default ChoiceOfTeaHouseAll