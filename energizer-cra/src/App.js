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
import Chargers from './components/chargers.json'


class App extends React.Component {


  
  constructor(props) {
    super(props);
    this.state = {
      chargingPoints: Chargers,
      isAuthenticated: false,
      userInfo: "",
      userData: "",
      userReceipts: [],
      lat: 65.009784,  
      lng: 25.473127,
      zoom: 13,
      selectedCharger: "",
      chargerViewSwitch: true,
      chargingSwitch: false,
      totalSeconds: 0,
      intervalID: "",
      chargingPrice:0,
      chargingDone : false,
      priceToPay: 0,
      totalTimeElapsed: 0

      }
    };

  useTimer= (maxSeconds) =>
  {
    this.setState({intervalID: (setInterval(this.setTime(maxSeconds),1000))});

  }

  PushReceipt = () =>
  {
    axios.post( constants.baseAddress + '/newreceipt' + this.state.userData.id, Auth.getAxiosAuth(),
    {
      Price: this.state.priceToPay,
      Time: this.state.totalTimeElapsed
    }
    )
    
    .then(function (response) {
      console.log(response);
      if (response.status === 200)
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  startCharging = () =>
  {  this.setState({chargingSwitch: true});
    console.log("Started ticking " + this.state.totalSeconds)
    this.setState( {intervalID: (setInterval(this.setTime, 1000))} );
  }

  stopCharging = () =>
  {
    this.setState({
      chargingSwitch:false,
      chargingDone: true
    });
    this.setState({
    intervalID: clearInterval(this.state.intervalID),
    priceToPay: this.state.chargingPrice,
    totalTimeElapsed: this.state.totalSeconds,
    totalSeconds: 0,
    chargingPrice: 0,
    chargingDone: true
    })
    console.log("Exiting charge mode..")
    this.PushReceipt();
  }

  setTime = (seconds) => {
    this.setState({totalSeconds: this.state.totalSeconds+1});
    this.setState({chargingPrice: ((this.state.totalSeconds/1000) * this.state.selectedCharger["Price"]).toFixed(2) })
    console.log("tick.. " + this.state.totalSeconds)

    if(seconds > 0)
    {
      if (this.state.totalSeconds/1000 > seconds)
      {
        this.postChargeRedirect();
        this.setState({totalSeconds: 0,
        chargingPrice: 0})
      }
    }
    
  }


  ChargeViewHandler = () =>
  {
    console.log("Button been clicked")
    if(this.state.chargerViewSwitch === true){ 
      this.setState({chargerViewSwitch:false});
    }
    else
    {
      this.setState({chargerViewSwitch:true});
    }
    console.log(this.state.chargerViewSwitch)
  }

  setSelectedCharger= (chosenCharger) =>
  {
    this.setState({selectedCharger: chosenCharger});
    console.log(this.state.selectedCharger['ID'])
  }
  onLogin = (user) => {
    this.getChargingData();
    this.setState({ isAuthenticated: true })
    this.getUserData(user);
  }

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  }

  onLogOut = () =>{
    this.setState({isAuthenticated:false})
    console.log("user Logged out")
    this.setState({userInfo: [], userReceipts:[], selectedCharger:[]})
  }

  /* This function illustrates how some protected API could be accessed */
  //  loadProtectedData = () => {
  //    axios.get(constants.baseAddress + '/userinfo' , Auth.getAxiosAuth()).then(result => {
  //      this.setState({ userData: result });
  //    })
  //  }

  getUserData(username) {
    axios.get(constants.baseAddress + '/userinfo/' + username , Auth.getAxiosAuth()).then(result => {
      this.setState({ userData: result.data });
      console.log("User has logged in, retrieving userData")
      console.log(this.state.userData);
    })
  }


  getChargingData() {
    
     // axios.get('https://api.openchargemap.io/v3/poi/?output=json&countrycode=fi&maxresults=20&compact=true&verbose=false&latitude=65.009784&longitude=25.473127')
       // .then((response) => {
        //  this.setState({ chargingPoints: response.data })
        this.setState({ chargingPoints: Chargers })
      //  });
    

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
          redirectPathOnSuccess="/energizer"
          goRegister="/register"
          {...routeProps}
          />
    } />
    <ProtectedRoute isAuthenticated={this.state.isAuthenticated} path="/energizer" exact render={
        (routeProps) =>
          <ProtectedView
            chargingPoints={ this.state.chargingPoints }
            lat = {this.state.lat}
            lng = {this.state.lng}
            zoom = {this.state.zoom}
            setSelectedCharger={this.setSelectedCharger}
            selectedCharger={this.state.selectedCharger}
            userData = {this.state.userData}
            LogOut={this.onLogOut}
            ChargeViewHandler={this.ChargeViewHandler}
            viewSwitch={this.state.chargerViewSwitch}
            chargingSwitch ={this.state.chargingSwitch}
            startedCharging = {this.startCharging}
            stoppedCharging = {this.stopCharging}
            totalSeconds={this.state.totalSeconds}
            chargingPrice={this.state.chargingPrice}
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

