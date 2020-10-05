import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  componentWillMount() {
    if (localStorage.getItem("token")) {
      this.setState({sessionToken: localStorage.getItem("token")});
    }
  }

  updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    this.setState(newToken => {
      return{ sessionToken: newToken }
    })
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ""});
  };

  render() {
    return (
      <div>
        <Navbar sessionToken={this.state.sessionToken} updateToken={this.updateToken} clearToken={this.clearToken}/>
        <div className="main">
        </div>
      </div>
    );
  }
}

export default Main;
