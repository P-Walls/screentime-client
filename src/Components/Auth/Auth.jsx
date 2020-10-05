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
    };
  }

  handleSubmit = (event, props /*: React.FormEvent<HTMLElement>*/) => {
    event.preventDefault();
    console.log(this.state.email, this.state.password);

    if (this.state.password.length > 8) {
      let userObject = {
        email: this.state.email,
        password: this.state.password,
      };

    fetch(`http://localhost:3025/user/login`, {
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
    } 
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Auth;
