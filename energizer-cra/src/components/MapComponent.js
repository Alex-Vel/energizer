import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default function MapComponent(props)
{
 
 function onSearchFieldChange(event)
 {
    let newsearchstring =   event.target.value;
    console.log(newsearchstring);
    props.OnSearchChange(newsearchstring);
  };

  function markerClick(chargingPoint)
  {
    if(props.isAuthenticated === true){ 
    props.setSelectedCharger(chargingPoint);
    }
  }

  function goCharge()
  {
    props.ChargeViewHandler();
  }

  function searchButton(event)
  {
    event.preventDefault();
    if(event.target.id === "all")
    {
      props.searchBool("all")
    }
    else if(event.target.id ==="free")
    {
      props.searchBool("free")
    }
    else if(event.target.id ==="fast")
    {
      props.searchBool("fast")
    }

  }

  function setCharger()
  {
    if(props.isAuthenticated === true){ 
      return ( 
            <button onClick={goCharge}>Use this charger</button>
           )
           
    }
    else
    { 
      return(
      <>
      <div className="red"> Please login to charge</div>
      </>
      )
    }
  }

    
    
   return(
    props.chargingPoints ?

     <div className = "mapClass"> 
     <div className="buttonFlex">
       <div>
     Search:
          <input
            type="text"
            onChange={onSearchFieldChange}
            name="searchfield"
            id="searchfield"
            style={{margin:"10px"}}
            value={props.searchstring}
            />
            result: {props.chargingPoints.length} chargers
            </div>
            <button className="buttonStyleTwo" onClick={searchButton} id="all"> View all</button>
          
            <button className="buttonStyleTwo"  onClick={searchButton} id="free"> View free</button>
            <button className="buttonStyleTwo"  onClick={searchButton} id="fast"> View fast charge</button>
            <div></div>
            </div>
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
           <span>Name: {chargingPoint['Title']}</span>
           <br/>
            <span>Address: {chargingPoint['AddressLine1']}, {chargingPoint['Town']} - {chargingPoint['Postcode']}</span>
            <br/>
            <span>Charge Code: {chargingPoint['Code']}</span>
          <br/>
          <br/>
            <span>Output: {chargingPoint['PowerKW']}kWh Connector: {chargingPoint['ConnectionType']}</span>
            <br/>
            <span>Price:€ 0.{chargingPoint['Price']} per minute </span>
            <br/>
            <span> Status: available</span>
            <br/>

            {setCharger()}
          
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