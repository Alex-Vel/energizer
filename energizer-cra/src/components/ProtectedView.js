import React from "react";
import MapComponent from "./MapComponent";
import ChargerInfo from "./ChargerInfo";
import ChargingView from "./ChargingView";

export default function ProtectedView(props) {
  let output;

  function Logout() {
    if (props.viewSwitch === false) {
      document.getElementById("logoutprompt").value =
        "cannot logOut while charging";
    } else {
      props.LogOut();
    }
  }

  if (props.viewSwitch === true) {
    output = (
      <div>
        <div>
          <MapComponent
            chargingPoints={props.chargingPoints}
            lat={props.lat}
            lng={props.lng}
            zoom={props.zoom}
            setSelectedCharger={props.setSelectedCharger}
          />
        </div>
        <div>
          <ChargerInfo
            selectedCharger={props.selectedCharger}
            ChargeViewHandler={props.ChargeViewHandler}
          />
        </div>
      </div>
    );
  } else {
    output = (
      <ChargingView
        // selectedCharger={props.selectedCharger}
        // ChargeViewHandler= {props.ChargeViewHandler}
        // startedCharging = {props.startedCharging}
        // stoppedCharging = {props.stoppedCharging}
        // chargingSwitch = {props.chargingSwitch}
        // totalSeconds ={props.totalSeconds}
        {...props}
      />
    );
  }

  return (
    <>
      <div className={"topMenuBar"}>

          {" "}
          User account
          {props.userData.username}
          <div>
          <button onClick={Logout}> Logout </button>
          <output type="text" id="logoutprompt"></output>
        </div>
        </div>
        <div className ={ "mainContent"}>


        <div>
          <h1>This view is example of a protected view</h1>
          <div>
            You should not be able to access this without being logged in
          </div>

          {output}
      </div>
      </div>
    </>
  );
}
