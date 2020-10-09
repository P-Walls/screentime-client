import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Test from "../../Search/Test";
import Auth from "../../Auth/Auth";
import UserHome from "../../User Components/UserHome";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MovieIcon from "@material-ui/icons/Movie";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentWillMount() {
  //   localStorage.getItem("token")
  //     ? console.log(this.props.sessionToken)
  //     : console.log("No Session Token");
  // }

  componentDidUpdate() {
    this.props.sessionToken !== ""
      ? console.log(this.props.sessionToken)
      : console.log("No Session Token");
  }

  render() {
    return (
      <div>
        <Router>
          <AppBar>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MovieIcon />
              </IconButton>
              <Typography variant="h4" color="inherit">
                <Link className="nav_links" to="/">ScreenTime</Link>
              </Typography>
              <ul>
                <li>
                  <Button
                    color="inherit"
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Link className="nav_links" to="/test">Test</Link>
                  </Button>
                </li>
                <li>
                  <Button
                    color="inherit"
                    className="nav_links"
                    onClick={this.props.clearToken}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </Toolbar>
          </AppBar>
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
