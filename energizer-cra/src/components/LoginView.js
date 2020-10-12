  
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
        document.getElementById("loginfail").value= "incorrect password or username";
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
       Please enter your username and password to login
      </div>
     <br/>

      <form onSubmit={ login }>
        <div>
          Username <input type="text" name="username" />
        </div>
        <div>
          Password <input type="text" name="password" />
        </div>
          <div className="buttonFlex">
          <button type="submit">Login</button>
          <button onClick = {goRegister}> Register </button>
         
          
          </div>
          <output type="text" id="loginfail" name="loginfail"></output>
      </form>

    <div>
        </div>
        

    <div> 
        <br/>
    </div>
    <MapComponent
            chargingPoints={props.chargingPoints}
            lat={props.lat}
            lng={props.lng}
            zoom={props.zoom}
            setSelectedCharger={props.setSelectedCharger}
            searchstring ={props.searchstring}
            OnSearchChange={props.OnSearchChange}
            searchBool={props.searchBool}
          />


    </div>
  )
}