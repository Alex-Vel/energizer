import React from 'react';

//this returns the charger info for the main view.

export default function ChargerInfo(props) {

let output = ""; 
function goChargerView () 
{
    props.ChargeViewHandler();
}

if(props.selectedCharger['ID'] !== undefined)
{ 
output = 
<>
<div className="mainContent">
<div>ID:{props.selectedCharger["ID"]}</div>
<div>Name:{props.selectedCharger["Title"]}</div>
<div>Charging code:{props.selectedCharger["Code"]}</div>
<button onClick={() => goChargerView()}>Use this charger.</button>
</div>
</>
}
else{
    output="No charger selected"
}

return (
    <>
    {output}
    </>
)
}