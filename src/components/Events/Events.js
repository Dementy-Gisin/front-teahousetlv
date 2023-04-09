import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CreateEventPopUp from '../Popup/CreateEventPopUp';
import './Events.css'

function Events() {
  const [events, setEvents] = useState([]);
  const text = localStorage.getItem('user');
  const user = JSON.parse(text);
  const navigation = useNavigate();
  const fetchAllEvents = async() => {
      await axios.get('https://myteahousetlv.herokuapp.com/api/events/fetch-all-events', {mode: 'cors'})
                      .then(res => setEvents(res.data));
  } 
  useEffect(() => {
      fetchAllEvents();
  }, [])

  let evs;
  if(events){
    evs = Object.values(events);
  }
  const [trueOrFalseBtn, setTrueOrFalseBtn] = useState(false);
   const togglePopUpCreateEvent = () => {
        setTrueOrFalseBtn(!trueOrFalseBtn);
   }
  
  return (
    <div className='events-div'>
      <h3>Events</h3>
        {user?.isAdmin ? (
      <div className='div-createevent'>
        <button onClick={togglePopUpCreateEvent} className='create-newevent-btn'>Create New Event</button>
        {trueOrFalseBtn && <CreateEventPopUp handleClose={togglePopUpCreateEvent}/>}
      </div>
    ) : null}
    <div className='main-events-div'>
        
        {evs.map(item => (
          <div key={item?._id} className="events-item-div">
          <div className="events-item-box" onClick={() => navigation(`/api/events/fetch-event/${item?._id}`)}>
            <div className="events-item-div-photo">
            <img style={{width: '200px', height: '250px'}}  src=
                                    {item?.eventPhotos[0]?.fileType 
                                        ? 
                                    `data:${item?.eventPhotos[0]?.fileType};base64, 
                                    ${item?.eventPhotos[0]?.image?.data?.toString('base64')}` 
                                    : null
                                } alt="" /> 
            </div>
            <div className="content-event-div">
              <div>
                <h2>{item?.title}</h2>
                <p>{item?.description}</p>
              </div>
            </div>
          </div>
          </div>
          
        ))}
     
    </div>
    </div>
    
  )
}

export default Events