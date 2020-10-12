import React from 'react';

//this returns the users previous consumptions
export default function RegisterFail(props) {
function GoRegister() {
    props.history.push(props.goRegister);
}

return (
    <>
    <div className="mainContent">
    <h1>Registration Fail</h1>
    <p>Username already taken, or fields left empty</p>
    <p>Check whether the passwords match</p>
    <button onClick = {GoRegister}> Go back to registration </button>
    </div>
    </>
)

}
