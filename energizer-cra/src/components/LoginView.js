  
import React from 'react';
import Auth from './MyAuth';

export default function LoginView(props) {

  function login(event)
  {
    event.preventDefault();
    Auth.authenticate(event.target['username'].value, event.target['password'].value)
      .then(result =>
        {
          props.loginSuccess();
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
    <div>
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
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

    <div>
        If you don't have an account yet, please register.
        <button onClick = {goRegister}> Register </button>
    </div>
    <div> 
        
    </div>



    </div>
  )
}