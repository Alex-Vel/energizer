import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default function MapComponent(props)
{


  function markerClick(chargingPoint)
  {
    if(props.isAuthenticated === true){ 
    props.setSelectedCharger(chargingPoint);
    }
  }
   return(
    props.chargingPoints ?

     <div className = "mapClass"> 
     
    <Map
       center={[props.lat, props.lng]} 
       zoom={props.zoom} 
       style={{ width: '900px', height: '400px'}}
    >
    <TileLayer
      attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />

    {
    props.chargingPoints.map(chargingPoint => {
    const point = [chargingPoint['Latitude'],chargingPoint['Longitude']]
         

return (
    <Marker onClick={() => markerClick(chargingPoint)} position={point} key={chargingPoint['ID']} >
         <Popup>
            <span>ADDRESS: {chargingPoint['AddressLine1']}, {chargingPoint['Town']} - {chargingPoint['Postcode']}</span>
          <br/>
            <span>Wattage: {chargingPoint['PowerKW']}</span>
            <br/>
            <span>Price:€ 0.{chargingPoint['Price']} per minute </span>
            <br/>
            <span> Status: available</span>
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