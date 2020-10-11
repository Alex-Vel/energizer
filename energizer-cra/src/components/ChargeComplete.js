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
    <div>
    <h1> Charge completed!</h1>
    <button onClick={goMap}>Go back to map..</button>
    <button onClick={goAccount}> go to account </button>
    </div>
    </>
)
}