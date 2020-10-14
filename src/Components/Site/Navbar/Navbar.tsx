import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MovieIcon from "@material-ui/icons/Movie";
import "./Navbar.css";

type AcceptedProps = {
  sessionToken: string;
  clearToken: () => void;
  role: boolean;
};

class Navbar extends Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
  }

  componentDidUpdate() {
    this.props.sessionToken
      ? console.log(this.props.sessionToken)
      : console.log("No Session Token");
  }

  render() {
    return (
      <div>
        {/* <Router> */}
        <AppBar>
          <Toolbar className="navbar">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link className="nav_links" to="/">
                <MovieIcon />
              </Link>
            </IconButton>
            <Button color="inherit">
              <Typography variant="h3" color="inherit">
                <Link className="nav_links" to="/">
                  ScreenTime
                </Link>
              </Typography>
            </Button>
            <ul>
              <li>
                <Button color="inherit">
                  <Typography variant="h6" color="inherit">
                    <Link className="nav_links" to="/movies">
                      Movies
                    </Link>
                  </Typography>
                </Button>
              </li>
              <li>
                <Button color="inherit">
                  <Typography variant="h6" color="inherit">
                    <Link className="nav_links" to="/tv">
                      TV Shows
                    </Link>
                  </Typography>
                </Button>
              </li>
              <li>
                <Button color="inherit" onClick={this.props.clearToken}>
                  <Typography variant="h6" color="inherit">
                    <Link className="nav_links" to="">
                      Logout
                    </Link>
                  </Typography>
                </Button>
              </li>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
