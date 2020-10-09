import React, {useState} from 'react';
import MapComponent from './MapComponent';
import ChargerInfo from './ChargerInfo';
import ChargingView from './ChargingView';


export default function ProtectedView(props) {


  let output;
  
  if(props.viewSwitch == true)
  { 
    output = 
    <div> 
    <div>
    <MapComponent chargingPoints={props.chargingPoints}
    lat = {props.lat}
    lng = {props.lng}
    zoom = {props.zoom}
    setSelectedCharger = {props.setSelectedCharger}
    />
    </div>
    <div>
   <ChargerInfo selectedCharger={props.selectedCharger}
    ChargeViewHandler= {props.ChargeViewHandler}
      />
    </div>
    </div>
  }
  else
    {
      output = 
      <ChargingView 
      selectedCharger={props.selectedCharger}
      ChargeViewHandler= {props.ChargeViewHandler}
    
      />
    }

  

  return (
    <>
    <div className={"topMenuBar"}>
      <div> User account </div>
      <button onClick={props.logOut}> Logout </button>
    </div>

    <div>
      <h1>This view is example of a protected view</h1>
      <div>
        You should not be able to access this without being logged in
      </div>

      {output}

    </div>
    </>
  )
}