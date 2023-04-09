import axios from 'axios';
import React, { useLayoutEffect } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import UpdateDeleteEventPopUp from '../Popup/UpdateDeleteEventPopUp';
import './Event.css';

function Event() {
  const {id} = useParams();
  const [event, setEvent] = useState({});
  const fetchOneEvent = async() => {
        await axios.get(`https://myteahousetlv.herokuapp.com/api/events/fetch-event/${id}`, {mode: 'cors'})
                        .then(res => setEvent(res.data))
  }
  useEffect(() => {
    fetchOneEvent()
  }, [])
  const text = localStorage.getItem('user');
    const user = JSON.parse(text);
    const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false);
    const togglePopUpUpdate = () => {
        setTrueOrFalseBtn(!trueOrFalseBtn);
        
       
    }
  return (
    <div className='main-one-event'>
      <div className="event-title">
        <h4>{event?.title}</h4>
      </div>
       <div className="event-container">
      {(event?.eventPhotos)?.map(photo => (
             
              <div key={photo?._id} className="event-box">
              <img  src=
                                        {photo?.fileType 
                                            ? 
                                        `data:${photo?.fileType};base64, 
                                        ${photo?.image?.data?.toString('base64')}` 
                                        : null
                                    } alt="" /> 
              
            </div>
      ))}
     
        </div>
        <div className="event-description">
        {user?.isAdmin ? (
            <div className='admin-event-div'>
                <button onClick={togglePopUpUpdate}>Update Event</button>
                <button onClick={togglePopUpUpdate}>Delete Event</button>
                {trueOrFalseBtn && <UpdateDeleteEventPopUp handleClose={togglePopUpUpdate} id={id}/>}
            </div>
        ) : null}
        <h4>Description of Event</h4>
        <p>{event?.description}</p>
        </div>
    
</div>
  )
}

export default Event