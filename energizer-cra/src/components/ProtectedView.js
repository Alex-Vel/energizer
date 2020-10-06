import React from 'react';
import MapComponent from './MapComponent';
export default function ProtectedView(props) {


  debugger
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
      />
      </div>

    </div>
  )
}