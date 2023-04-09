import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import React from 'react'
import { useRef } from 'react';
import './MapScreen.css'

function MapScreen() {
    
    const center = { lat: 32.121740, lng: 34.822660 }
    const libraries = ['places'];
    let libRef = useRef(libraries);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAFTJ7p12Qd1gNL03iVmhOix4sQiii78DM",
        libraries: libRef.current,
    })
    
    if(isLoaded)
    return (

        <div className='map-screen-div'> 
        <a href='https://www.google.com/maps/place/32.121300,34.822810'>
        
        <GoogleMap
         center={center}
         zoom={14}
         mapContainerStyle={{ width: '650px', height: '550px' }}
         options={{
           zoomControl: false,
           streetViewControl: false,
           mapTypeControl: false,
           fullscreenControl: false,

         }}
        
       >
         <Marker position={center} />
       
       </GoogleMap>
       </a>
       </div>
       
   )
}

export default MapScreen