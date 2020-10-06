import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProtectedView from './components/ProtectedView';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterSucces from './components/RegisterSucces';
import RegisterFail from './components/RegisterFail';
import Auth from './components/MyAuth';
import axios from 'axios';
import constants from './constants.json';


class App extends React.Component {


  
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      chargingPoints : [],
      userInfo: [],
      UserReceipts: [],
      lat: 65.009784,  
      lng: 25.473127,
      zoom: 13
    };
  }

  onLogin = () => {
    this.getChargingData();
    this.setState({ isAuthenticated: true })
  }

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  }

  /* This function illustrates how some protected API could be accessed */
  loadProtectedData = () => {
    axios.get(constants.baseAddress + '/users', Auth.getAxiosAuth()).then(results => {
      this.setState({ someData: results.data.users });
    })
  }

  getChargingData() {
    
      axios.get('https://api.openchargemap.io/v3/poi/?output=json&countrycode=fi&maxresults=20&compact=true&verbose=false&latitude=65.009784&longitude=25.473127')
        .then((response) => {
          this.setState({ chargingPoints: response.data })
        });
    
  }

  
render() { 
return (
  <div className = "App"> 
  <Router>
    <Route path="/" exact render={
      (routeProps) =>
        <LoginView
          loginSuccess = { this.onLogin }
          loginSucces = {this.getChargingData}
          loginFail = { this.onLoginFail }
          userInfo={ this.state.userInfo }
          redirectPathOnSuccess="/example"
          goRegister="/register"
          {...routeProps}
          />
    } />
    <ProtectedRoute isAuthenticated={this.state.isAuthenticated} path="/example" exact render={
        (routeProps) =>
          <ProtectedView
            chargingPoints={ this.state.chargingPoints }
            lat = {this.state.lat}
            lng = {this.state.lng}
            zoom = {this.state.zoom}
            {...routeProps}
            />
      }>
    </ProtectedRoute>

    <Route path="/register" exact render={
      (routeProps) =>
      <RegisterView
      registersucces ="/registersucces"
      registerfail ="/registerfail"
      {...routeProps}
     />
    }
   />

   <Route path="/registersucces" exact render={
     (routeProps) =>
     <RegisterSucces
     goLogin="/"
     {...routeProps}
     />
   }
   /> 

<Route path="/registerfail" exact render={
     (routeProps) =>
     <RegisterFail
     goRegister="/register"
     {...routeProps}
     />
   }
   /> 
     
   
    
  </Router>
  </div>
)
}
}
export default App;

