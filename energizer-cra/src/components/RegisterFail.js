import React from 'react';

//this returns the users previous consumptions
export default function RegisterFail(props) {
function GoRegister() {
    props.history.push(props.goRegister);
}

return (
    <>
    <h1>Registration Fail</h1>
    <p>Username already take, or fields left empty</p>
    <p>Check whether the passwords match</p>
    <button onClick = {GoRegister}> Go back to registration </button>
    </>
)

}
