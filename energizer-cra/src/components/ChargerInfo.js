import React from 'react';

//this returns the charger info for the main view.

export default function ChargerInfo(props) {

let output = ""; 

if(props.selectedCharger != null)
{ 
output = <div>ID:{props.selectedCharger["ID"]}</div>
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