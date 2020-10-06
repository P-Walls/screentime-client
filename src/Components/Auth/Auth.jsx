import React, { Component } from "react";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sessionToken: "",
      passError: "",
      login: false,
    };
  }

  title = () => {
    return this.state.login === true ? "Login" : "Signup";
  };

  label = () => {
    return this.state.login === false ? "Go to Login" : "Go to Signup";
  };

  passError = () => {
    return this.state.passError === true ? (
      <span
        className="pass_error"
        style={{ width: "100%", textAlign: "center" }}
      >
        Password must be 7 characters or Longer!
      </span>
    ) : null;
  };

  loginToggle = (e) => {
    e.preventDefault();
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sessionToken: "",
      passError: "",
      login: !this.state.login,
    });
  };

  signupFields() {
    return !this.state.login ? (
      <div>
        <label>First Name: </label>
        <br />
        <input
          name="firstName"
          type="text"
          required
          value={this.state.firstName}
          onChange={(e) => this.setState({ firstName: e.target.value })}
        />
        <br />
        <label>Last Name: </label>
        <br />
        <input
          name="lastName"
          type="text"
          required
          value={this.state.lastName}
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />
      </div>
    ) : null;
  }

  handleSubmit = (event, props /*: React.FormEvent<HTMLElement>*/) => {
    event.preventDefault();

    if (this.state.password.length > 7) {
      let userObject = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: "user",
      };

      let url = this.state.login
        ? `http://localhost:3025/user/login`
        : `http://localhost:3025/user/register`;

      fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(userObject),
      })
        .then((res) => res.json())
        .then((data) => {
          this.props.updateToken(data.sessionToken);
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        sessionToken: "",
        passError: (
          <span
            style={{ width: "100%", textAlign: "center" }}
          >
            Password must be 7 characters or Longer!
          </span>
        ),
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3>{this.title()}</h3>
          </div>
          {this.signupFields()}
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <br/>
          {this.state.passError}
          <br />
          <button type="submit">Submit</button>
          <button onClick={this.loginToggle}>{this.label()}</button>
        </form>
      </div>
    );
  }
}

export default Auth;
