import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Navbar.css";
import Test from "../../Search/Test";
import Auth from "../../Auth/Auth";
import UserHome from "../../User Components/UserHome";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.sessionToken !== ""
      ? console.log(this.props.sessionToken)
      : console.log("No Session Token");
  }

  render() {
    return (
      <div>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/test">Test</Link>
              </li>
              <button onClick={this.props.clearToken}>Logout</button>
            </ul>
          </nav>
          <Switch>
            <Route path="/">
              {this.props.sessionToken === "" ? (
                <Auth
                  sessionToken={this.props.sessionToken}
                  updateToken={this.props.updateToken}
                />
              ) : (
                <UserHome sessionToken={this.props.sessionToken} />
              )}
            </Route>
            <Route path="/test">
              <Test />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Navbar;
