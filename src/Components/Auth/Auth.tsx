import React, { Component } from "react";
import "./Auth.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from "../../Helpers/environment";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Admin from "../Admin/Admin";

type AcceptedProps = {
  updateToken: (newToken: string) => void;
  sessionToken: string;
  updateRole: (newRole: boolean) => void;
  role: boolean;
};

type AuthState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: boolean;
  error: any;
  login: boolean;
};

class Auth extends Component<AcceptedProps, AuthState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: false,
      error: "",
      login: true,
    };
  }

  title = () => {
    return this.state.login === true ? "Login To Start Reviewing!" : "Create An Account";
  };

  label = () => {
    return this.state.login === false ? "Go to Login" : "Go to Signup";
  };

  passError = () => {
    return this.state.error === true ? (
      <span
        className="pass_error"
        style={{ width: "100%", textAlign: "center", color: "red" }}
      >
        Password must be 7 characters or Longer!
      </span>
    ) : null;
  };

  loginToggle = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
      login: !this.state.login,
    });
  };

  signupFields() {
    return !this.state.login ? (
      <div>
        <label>First Name: </label>
        <br />
        <TextField
          name="firstName"
          type="text"
          required
          value={this.state.firstName}
          onChange={(e) => this.setState({ firstName: e.target.value })}
        />
        <br />
        <label>Last Name: </label>
        <br />
        <TextField
          name="lastName"
          type="text"
          required
          value={this.state.lastName}
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />
      </div>
    ) : null;
  }

  handleSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (this.state.password.length > 7) {
      let userObject = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: this.props.role,
      };

      let url = this.state.login
        ? `https://${APIURL}/user/login`
        : `https://${APIURL}/user/register`;

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
          this.props.updateRole(data.user.role);
          console.log(data.user.role)
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: (
          <span style={{ width: "100%", textAlign: "center" }}>
            Password must be 7 characters or Longer!
          </span>
        ),
      });
    }
  };

  authViews(){
    if (this.props.role === true) {
      return(<div>
        <Admin/>
      </div> )
    }
  }

  render() {
    return (
      <div className="main">
        <div className="form-body">
          <Container maxWidth="xs">
            <Paper>
              <br />
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div>
                  <h3>{this.title()}</h3>
                </div>
                {this.signupFields()}
                <label htmlFor="email">Email:</label>
                <br />
                <TextField
                  type="text"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                    if (this.state.email === "pwalls@admin.com") {
                      this.setState({ role: true });
                    }
                  }}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <br />
                <TextField
                  type="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <br />
                {this.state.error}
                <br />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Submit
                </Button>{" "}
                <Button
                  onClick={this.loginToggle}
                  color="secondary"
                  variant="contained"
                  size="small"
                >
                  {this.label()}
                </Button>
              </form>
              <br />
            </Paper>
          </Container>
        </div>
      </div>
    );
  }
}

export default Auth;
