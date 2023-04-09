import React from 'react'
import MapScreen from './MapScreen';
import './Details.css';

function Details() {
    
    
     

  return (
    <div>
        <div className="details-screen">
            <div className="details-address-tel">
                <h3>Name: Tel Aviv House</h3>
                <h3>Address: Menora, 28 Tel Aviv</h3>
                <h3>Telephone: +972543098002</h3>
            </div>
            <div className='map'>
            <MapScreen/>
            </div>
       
        </div>
        
    </div>
  )
}

export default Details