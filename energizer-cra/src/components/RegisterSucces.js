import React from 'react';

//this returns the users previous consumptions
export default function RegisterSucces(props) {
function GoLogin() {
    props.history.push(props.goLogin);
}

return (
    <>
    <div className="mainContent">
    <h1>Registration Succes!</h1>
    <button onClick = {GoLogin}> Go to login </button>
    </div>
    </>
)

}
