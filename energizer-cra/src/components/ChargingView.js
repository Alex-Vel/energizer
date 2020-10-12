import React from "react";

//this returns the users previous consumptions
export default function ChargingView(props) {
  let output = "";

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  function startCharging(event) {
    event.preventDefault();
    if (event.target["enteredCode"].value === props.selectedCharger["Code"]) {
      props.startedCharging();
      console.log("Started charging..");
    } else {
      document.getElementById("outputCode").value = "Wrong code entered";
    }
  }

  function stopCharging() {
    props.stoppedCharging();
    props.history.push(props.chargeComplete)
  }

  if (props.chargingSwitch === true) {
    output = (
      <> 
        <div>Charging.. please dont leave this page while charging.</div>
        <div>Charger ID: {props.selectedCharger["ID"]}</div>
        <div>
        Time: <output type="text" id="minutes">{(pad(parseInt(props.totalSeconds / 60)))}</output>
      :
         <output type="text" id="seconds">{(pad(props.totalSeconds % 60))}</output>
         </div>
         <div>Price: <output type="text" id="price">{"€" + props.chargingPrice }</output></div>
         <div>Charge in kWh: <output type="text" id="power">{props.totalPower}</output> </div>
        <button onClick={stopCharging}> Stop Charging </button>
      </>
    );
  } else {
    output = (
      <>
        <div>Charger ID: {props.selectedCharger["ID"]}</div>
        <div>Price per minute: €0.{props.selectedCharger["Price"]} </div>
        <div>Output: {props.selectedCharger["PowerKW"]} kWh </div>

        <div style={{fontWeight:"bold"}}>Charger Code: {props.selectedCharger["Code"]}</div>



        <form onSubmit={startCharging}>
          <div>
            Repeat Charger code: 
            <input type="text" id="enteredCode" name="enteredCode" />
            </div>
            <div>
            <output type="text" id="outputCode" name="codeoutput" />
          </div>
          <div>
            <button type="submit">Start charging!</button>        <button onClick={() => props.ChargeViewHandler()}>
          Go back to map
        </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="ChargingBlock">{output}</div>
    </>
  );
}
