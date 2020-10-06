import React, { Component } from "react";
import MovieIndex from "../MovieComponents/MovieIndex";

class UserHome extends Component {
  render() {
    return (
      <div>
        <h2>Welcome, User!</h2>
        <nav>
          <li></li>
        </nav>
        <MovieIndex sessionToken={this.props.sessionToken} />
      </div>
    );
  }
}

export default UserHome;
