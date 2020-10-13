import React from "react";
import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import ProtectedView from "./components/ProtectedView";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterSucces from "./components/RegisterSucces";
import UserOverview from "./components/UserOverview";
import RegisterFail from "./components/RegisterFail";
import ChargeComplete from "./components/ChargeComplete";
import Auth from "./components/MyAuth";
import axios from "axios";
import constants from "./constants.json";
import Chargers from "./components/chargers.json";

//make start-value state

const initialState = {
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
  totalPower: 0,
  receiptPower: 0,
  receiptTime: 0,
  intervalID: "",
  chargingPrice: 0,
  chargingDone: false,
  searchString: "",
  searchBool: "",
};

//constructor

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  //functions

  //function for search buttons
  searchBool = (term) => {
    console.log(term);
    if (term === "fast") {
      this.setState({
        chargingPoints: Chargers.filter(
          (chargepoint) => chargepoint.PowerKW >= 50
        ),
      });
    } else if (term === "free") {
      this.setState({
        chargingPoints: Chargers.filter(
          (chargepoint) => chargepoint.Price === "00"
        ),
      });
    }
    if (term === "all") {
      this.setState({
        chargingPoints: Chargers,
        searchString: "",
      });
    }
  };

  //function for searching
  onChangeSearch = (searchstring) => {
    console.log(searchstring);

    this.setState({
      searchString: searchstring,
      chargingPoints: Chargers.filter(
        (chargepoint) =>
          chargepoint.Title.toLowerCase().includes(
            searchstring.toLowerCase()
          ) ||
          chargepoint.AddressLine1.toLowerCase().includes(
            searchstring.toLowerCase()
          ) ||
          chargepoint.Town.toLowerCase().includes(searchstring.toLowerCase())
      ),
    });
  };

  //function to set interval for timer
  useTimer = (maxSeconds) => {
    this.setState({ intervalID: setInterval(this.setTime(maxSeconds), 1000) });
  };
  //start charging function
  startCharging = () => {
    this.setState({ chargingSwitch: true });
    console.log("Started ticking " + this.state.totalSeconds);
    this.setState({ intervalID: setInterval(this.setTime, 1000) });
  };
  //charging stopped function
  stopCharging = () => {
    this.PushReceipt(
      this.state.chargingPrice,
      this.state.totalSeconds,
      this.state.totalPower,
      this.state.selectedCharger
    );

    this.setState({
      chargingSwitch: false,
      chargerViewSwitch: true,
      chargingDone: true,
    });

    this.setState({
      intervalID: clearInterval(this.state.intervalID),
      priceToPay: this.state.chargingPrice,
      receiptPower: this.state.totalPower,
      receiptTime: this.state.totalSeconds,
      totalSeconds: 0,
      chargingPrice: 0,
      totalPower: 0,
      chargingDone: true,
    });
    console.log("Exiting charge mode..");
  };
  //function to set the time, power and price during charging
  setTime = () => {
    this.setState({ totalSeconds: this.state.totalSeconds + 1 });
    this.setState({
      chargingPrice: (
        ((this.state.totalSeconds / 60) * this.state.selectedCharger["Price"]) /
        100
      ).toFixed(2),
      totalPower: (
        (this.state.selectedCharger["PowerKW"] / 1000) *
        this.state.totalSeconds
      ).toFixed(2),
    });
    console.log("tick.. " + this.state.totalSeconds);
  };
  //function to display between views
  ChargeViewHandler = () => {
    console.log("Button been clicked");
    if (this.state.chargerViewSwitch === true) {
      this.setState({ chargerViewSwitch: false });
    } else {
      this.setState({ chargerViewSwitch: true });
    }
    console.log(this.state.chargerViewSwitch);
  };
  //function to select charger
  setSelectedCharger = (chosenCharger) => {
    this.setState({ selectedCharger: chosenCharger });
    console.log(this.state.selectedCharger["ID"]);
  };
  //login function
  onLogin = (user) => {
    this.setState({ isAuthenticated: true });
    this.getUserData(user);
  };
  //login failfunction
  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  };
  //logout function
  onLogOut = () => {
    this.setState({ isAuthenticated: false });
    console.log("user Logged out");
    this.setState(initialState);
  };
  //axios get userdata
  getUserData(username) {
    axios
      .get(constants.baseAddress + "/userinfo/" + username, Auth.getAxiosAuth())
      .then((result) => {
        this.setState({
          userData: result.data,
          userReceipts: result.data.receipts,
        });
        console.log("User has logged in, retrieving userData");
        console.log(this.state.userData);
      });
  }
  //axios push receipt
  PushReceipt = (price, time, power, charger) => {
    axios
      .put(
        constants.baseAddress + "/newreceipt/" + this.state.userData.id,
        {
          Price: price,
          Time: time,
          Power: power,
          Charger: charger,
        },
        Auth.getAxiosAuth()
      )
      .then((result) => {
        this.setState({ userReceipts: result.data });
      });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Route
            path="/"
            exact
            render={(routeProps) => (
              <LoginView
                loginSuccess={this.onLogin}
                loginSucces={this.getChargingData}
                loginFail={this.onLoginFail}
                userInfo={this.state.userInfo}
                redirectPathOnSuccess="/energizer"
                goRegister="/register"
                searchstring={this.state.searchString}
                OnSearchChange={this.onChangeSearch}
                chargingPoints={this.state.chargingPoints}
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={this.state.zoom}
                isAuthenticated={this.state.isAuthenticated}
                searchBool={this.searchBool}
                {...routeProps}
              />
            )}
          />
          <ProtectedRoute
            isAuthenticated={this.state.isAuthenticated}
            path="/energizer"
            exact
            render={(routeProps) => (
              <ProtectedView
                chargingPoints={this.state.chargingPoints}
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={this.state.zoom}
                setSelectedCharger={this.setSelectedCharger}
                selectedCharger={this.state.selectedCharger}
                searchstring={this.state.searchString}
                searchBool={this.searchBool}
                OnSearchChange={this.onChangeSearch}
                userData={this.state.userData}
                LogOut={this.onLogOut}
                ChargeViewHandler={this.ChargeViewHandler}
                viewSwitch={this.state.chargerViewSwitch}
                chargingSwitch={this.state.chargingSwitch}
                startedCharging={this.startCharging}
                stoppedCharging={this.stopCharging}
                totalSeconds={this.state.totalSeconds}
                totalPower={this.state.totalPower}
                chargingPrice={this.state.chargingPrice}
                isAuthenticated={this.state.isAuthenticated}
                goAccount="/account"
                chargeComplete="/chargecomplete"
                {...routeProps}
              />
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            isAuthenticated={this.state.isAuthenticated}
            path="/account"
            exact
            render={(routeProps) => (
              <UserOverview
                userData={this.state.userData}
                LogOut={this.onLogOut}
                userReceipts={this.state.userReceipts}
                goMap="/energizer"
                {...routeProps}
              />
            )}
          ></ProtectedRoute>

          <Route
            path="/register"
            exact
            render={(routeProps) => (
              <RegisterView
                registersucces="/registersucces"
                registerfail="/registerfail"
                home="/"
                {...routeProps}
              />
            )}
          />

          <Route
            path="/registersucces"
            exact
            render={(routeProps) => (
              <RegisterSucces goLogin="/" {...routeProps} />
            )}
          />

          <Route
            path="/registerfail"
            exact
            render={(routeProps) => (
              <RegisterFail goRegister="/register" {...routeProps} />
            )}
          />

          <Route
            path="/chargecomplete"
            exact
            render={(routeProps) => (
              <ChargeComplete
                goMap="/energizer"
                goAccount="/account"
                price={this.state.priceToPay}
                power={this.state.receiptPower}
                {...routeProps}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}
export default App;
