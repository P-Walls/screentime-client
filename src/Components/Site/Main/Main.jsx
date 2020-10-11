import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Auth from "../../Auth/Auth";
import UserHome from "../../User Components/UserHome";
import Test from "../../Search/Test";
import "./Main.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// type StateTypes = {
//   sessionToken: string;
// };

class Main extends Component /*<{}, StateTypes>*/ {
  constructor(props /*: {}*/) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  componentWillMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
  }

  updateToken = (newToken /*: string*/) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  };

  protectedViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <Route exact path="/home">
        <UserHome sessionToken={this.state.sessionToken} />
      </Route>
    ) : (
      <Route exact path="/">
        <Auth
          sessionToken={this.state.sessionToken}
          updateToken={this.updateToken}
        />
      </Route>
    );
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar
            sessionToken={this.state.sessionToken}
            updateToken={this.updateToken}
            clearToken={this.clearToken}
          />
          <div>
            <Switch>
              <Route exact path="/">
                {this.state.sessionToken === localStorage.getItem("token") ? (
                  <Redirect to="/home" />
                ) : (
                  <Auth updateToken={this.updateToken} />
                )}
              </Route>
              {this.protectedViews()}
              <Route path="/movies">
                <UserHome sessionToken={this.state.sessionToken}  />
              </Route>
              <Route path="/test">
                <Test />
              </Route>
            </Switch>
          </div>
        </Router>
        <div className="main"></div>
      </div>
    );
  }
}

export default Main;
