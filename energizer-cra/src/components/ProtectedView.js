import React from 'react';
import MapComponent from './MapComponent';
import ChargerInfo from './ChargerInfo';

export default function ProtectedView(props) {



  return (
    <div>
      <h1>This view is example of a protected view</h1>
      <div>
        You should not be able to access this without being logged in
      </div>
      <div>
      <MapComponent chargingPoints={props.chargingPoints}
      lat = {props.lat}
      lng = {props.lng}
      zoom = {props.zoom}
      setSelectedCharger = {props.setSelectedCharger}
      />
      </div>
      <div>
     <ChargerInfo selectedCharger={props.selectedCharger} />
      </div>

    </div>
  )
}