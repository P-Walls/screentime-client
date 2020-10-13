import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import "./UserHome.css";

type AcceptedProps = {
  sessionToken: string;
  role: boolean;
};

type UserState = {
  movieReviews: {
    id: number;
    title: string;
    director: string;
    release: string;
    runtime: number;
    userScore: number;
    review: string;
  }[];
  tvReviews: {
    id: number;
    title: string;
    network: string;
    seasons: any;
    userScore: any;
    review: string;
  }[];
};

class UserHome extends Component<AcceptedProps, UserState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      movieReviews: [],
      tvReviews: [],
    };
  }

  render() {
    return (
      <div className="user-landing">
        <Container  maxWidth="lg">
          <div className="extra-space"></div>
          <Container className="user-greeting" maxWidth="sm">
            <Paper>
              <br/>
            <h1>Welcome to ScreenTime!</h1>
            <div>
              <p>
                Click the links above to start reviewing your favorite movies
                and TV shows!
              </p>
            </div>
            <br></br>
            </Paper>
          </Container>
          <div className="extra-space"></div>
        </Container>
      </div>
    );
  }
}

export default UserHome;
