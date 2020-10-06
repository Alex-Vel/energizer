import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios';

export default function MapComponent(props)
{
  console.log(props.chargingPoints[1]);

   return(
    props.chargingPoints ?

     <div className = "mapClass"> 
     
    <Map
       center={[props.lat, props.lng]} 
       zoom={props.zoom} 
       style={{ width: '400px', height: '400px'}}
    >
    <TileLayer
      attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />

    {
    props.chargingPoints.map(chargingPoint => {
    const point = [chargingPoint['AddressInfo']['Latitude'],chargingPoint['AddressInfo']['Longitude']]
         

return (
    <Marker position={point} key={chargingPoint['ID']} >
         <Popup>
            <span>ADDRESS: {chargingPoint['addressline1']}, {chargingPoint['Town']} - {chargingPoint['Postcode']}</span>
          <br/>
            <span>BATTALION: {chargingPoint['battalion']}</span><br/>
         </Popup>
     </Marker>
  )
 })
}
</Map>
     </div>
       :
       <div>
       'Data is loading...'
        </div>
)
 }