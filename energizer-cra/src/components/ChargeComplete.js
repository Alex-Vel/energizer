import React from 'react';

//this returns the charger info for the main view.

export default function ChargerInfo(props) {

function goMap()
{
    props.history.push(props.goMap);
}
function goAccount()
{
    props.history.push(props.goAccount);
}

return (
    <>
      <div className ={ "mainContent"}>
          <p>You have been</p>
    <h1>Energized!</h1>
    <br/>
    <p>Total price: €{props.receipt.Price}</p>
    <p>Total power: {props.receipt.Power} kWh</p>
    <button onClick={goMap}>Go back to map..</button>
    <button onClick={goAccount}> Go to account.. </button>
    </div>
    </>
)
}