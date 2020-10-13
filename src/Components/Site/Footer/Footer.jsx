import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
//import "./Footer.css";

const styles = {
  root: {
    width: "100%",
    backgroundColor: "gray",
    color: "white",
    position: "fixed",
    left: "0",
    bottom: "0",
  },
  icon: {
    color: "white",
  },
};

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <BottomNavigation className={classes.root}>
        <BottomNavigationAction
          className={classes.icon}
          icon={<LinkedInIcon />}
          href="https://www.linkedin.com/in/patrickawalls/"
          target="blank"
        />
        <h5>Patrick Walls 2020</h5>
        <BottomNavigationAction
          className={classes.icon}
          icon={<GitHubIcon />}
          href="https://github.com/P-Walls/screentime-client"
          target="blank"
        />
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Footer);
