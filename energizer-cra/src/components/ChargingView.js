import React from 'react';

//this returns the users previous consumptions
export default function ChargingView(props) {
function startCharging(event) 
{
    event.preventDefault();


}

function stopCharging(event) 
{
    event.preventDefault();


}

return (
    <>
    <div className="ChargingBlock">
    <div>Charger ID: {props.selectedCharger["ID"]}</div>
    <button onClick={() => props.ChargeViewHandler()}> Go back to map</button>
    <form onSubmit={ startCharging }>
        <div>
          Enter Charger code <input type="text" name="code" />
        </div>
        <div>
          <button type="submit">Start Charging</button>
        </div>
      </form>
      <button onClick={stopCharging}>Stop Charging</button>
    </div>
    </>
)

}
