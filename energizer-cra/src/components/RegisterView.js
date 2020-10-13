import React from "react";
import Constants from "../constants.json";
import axios from "axios";

export default function RegisterView(props) {
  function registersucces() {
    props.history.push(props.registersucces);
  }
  function registerfail() {
    props.history.push(props.registerfail);
  }

  function register(event) {
    event.preventDefault();
    if (
      event.target["password"].value === event.target["password2"].value &&
      event.target["username"].value.length > 0 &&
      event.target["password"].value.length > 0 &&
      event.target["email"].value.length > 2
    ) {
      axios
        .post(Constants.baseAddress + "/register", {
          username: event.target["username"].value,
          password: event.target["password"].value,
          email: event.target["email"].value,
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            registersucces();
          }
        })
        .catch(function (error) {
          console.log(error);
          registerfail();
        });
    } else {
      registerfail();
    }
  }

  return (
    <div className="FlexColumn">
      <h1>Registration</h1>
      <h3>Please fill in the form</h3>

      <form onSubmit={register}>
        <div>
          Choose Username <input type="text" name="username" />
        </div>
        <br />
        <div>
          Choose Password <input type="text" name="password" />
        </div>
        <div>
          Repeat Password <input type="text" name="password2" />
        </div>

        <br />
        <div>
          Your Email <input type="email" name="email" />
        </div>
        <div className="buttonFlex">
         
          <button type="submit">Register</button>
          
          <button onClick={()=>props.history.push(props.home)}>Homepage</button>
        </div>
      </form>
    </div>
  );
}
