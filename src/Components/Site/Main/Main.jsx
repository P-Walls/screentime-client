import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Auth from "../../Auth/Auth";
import UserHome from "../../User Components/UserHome";
import MovieIndex from "../../MovieComponents/MovieIndex";
import TVIndex from "../../TVComponents/TVIndex";
import "./Main.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Admin from "../../Admin/Admin";

// type StateTypes = {
//   sessionToken: string;
// };

class Main extends Component /*<{}, StateTypes>*/ {
  constructor(props /*: {}*/) {
    super(props);
    this.state = {
      sessionToken: "",
      role: false,
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

  updateRole = (newRole /*: string*/) => {
    this.setState({
      role: newRole,
    });
  };

  adminViews = () => {
    if (this.state.role === true) {
      return (
        <Admin sessionToken={this.state.sessionToken} role={this.state.role} />
      );
    } else {
      return (
        <UserHome
          sessionToken={this.state.sessionToken}
          role={this.state.role}
        />
      );
    }
  };

  protectedViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <Route exact path="/home">
        {this.adminViews()}
      </Route>
    ) : (
      <Route exact path="/">
        <Auth
          sessionToken={this.state.sessionToken}
          updateToken={this.updateToken}
          updateRole={this.updateRole}
          role={this.state.role}
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
            role={this.state.role}
          />
          <div>
            <Switch>
              <Route exact path="/">
                {this.state.sessionToken === localStorage.getItem("token") ? (
                  <Redirect to="/home" />
                ) : (
                  <Auth
                    updateRole={this.updateRole}
                    updateToken={this.updateToken}
                  />
                )}
              </Route>
              {this.protectedViews()}
              <Route path="/home">
                <UserHome
                  sessionToken={this.state.sessionToken}
                  role={this.state.role}
                />
              </Route>
              <Route path="/movies">
                {this.state.sessionToken === localStorage.getItem("token") ? (
                  <MovieIndex sessionToken={this.state.sessionToken} />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <Route path="/tv">
                {this.state.sessionToken === localStorage.getItem("token") ? (
                  <TVIndex sessionToken={this.state.sessionToken} />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Main;
