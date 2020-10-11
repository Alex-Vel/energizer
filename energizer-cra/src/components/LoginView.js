  
import React from 'react';
import Auth from './MyAuth';
import MapComponent from './MapComponent'

export default function LoginView(props) {

  function login(event)
  {
    event.preventDefault();
    let username = event.target['username'].value;
    Auth.authenticate(event.target['username'].value, event.target['password'].value)
      .then(result =>
        {
          props.loginSuccess(username);
          props.history.push(props.redirectPathOnSuccess);
        })
      .catch(() => {
        props.loginFail();
      })

  }

  function goRegister()
  {
    props.history.push(props.goRegister);
  }

  return (
    <div className="loginView">
      <h1>Login</h1>
      <div>
       Please give your username and password to login
      </div>

      <form onSubmit={ login }>
        <div>
          Username <input type="text" name="username" />
        </div>
        <div>
          Password <input type="text" name="password" />
        </div>
        
          <button type="submit">Login</button>

      </form>

    <div>
        If you don't have an account yet, please register.
        </div>
        <button onClick = {goRegister}> Register </button>

    <div> 
        
    </div>
    <MapComponent
            chargingPoints={props.chargingPoints}
            lat={props.lat}
            lng={props.lng}
            zoom={props.zoom}
            setSelectedCharger={props.setSelectedCharger}
          />


    </div>
  )
}