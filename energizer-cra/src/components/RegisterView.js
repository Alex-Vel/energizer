  
import React from 'react';
import Constants from '../constants.json'
import axios from 'axios';

export default function RegisterView(props) {

  function registersucces()
  {
    props.history.push(props.registersucces);
  }
  function registerfail()
  {
    props.history.push(props.registerfail);
  }

  function register(event)
  {

    event.preventDefault();

      axios.post( Constants.baseAddress + '/register', {
        username: event.target['username'].value,
        password: event.target['password'].value,
        email: event.target['email'].value 
      })
      .then(function (response) {
        console.log(response);
        if (response.status == 200)
        {registersucces();}

      })
      .catch(function (error) {
        console.log(error);
        registerfail();
      });

  }


  return (
    <div>
      <h1>Registration</h1>
      <div>
       Please fill in the form
      </div>

      <form onSubmit={ register }>
        <div>
          Choose Username <input type="text" name="username" />
        </div>
        <div>
          Choose Password <input type="text" name="password" />
        </div>
        <div>
          Your Email <input type="text" name="email" />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>



    </div>
  )
}