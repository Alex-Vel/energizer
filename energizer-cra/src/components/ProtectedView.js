import React from "react";
import MapComponent from "./MapComponent";
import ChargerInfo from "./ChargerInfo";
import ChargingView from "./ChargingView";

export default function ProtectedView(props) {
  let output;

  function Logout() {
    if (props.chargingSwitch === true) {
      document.getElementById("logoutprompt").value =
        "cannot logOut while charging";
    } else {
      props.LogOut();
    }
  }
  function goAccount() {
    if (props.chargingSwitch === true) {
      document.getElementById("logoutprompt").value =
        "cannot go to account while charging";
    } else {
      props.history.push(props.goAccount);
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
            isAuthenticated ={props.isAuthenticated}
            searchstring ={props.searchstring}
            OnSearchChange={props.OnSearchChange}
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
          <button onClick={goAccount}>Go to account</button>
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
