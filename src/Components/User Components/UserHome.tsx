import React, { Component } from "react";
import MovieIndex from "../MovieComponents/MovieIndex";
import TVIndex from "../TVComponents/TVIndex";

type AcceptedProps = {
  sessionToken: string;
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

  fetchMovieReviews = (token: string) => {
    fetch(`http://localhost:3025/movie/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((reviews) => {
        //console.log(reviews)
        this.setState({
          movieReviews: reviews,
        });
      });
  };

  fetchTVReviews = (token: string) => {
    fetch(`http://localhost:3025/tv/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((reviews) => {
        //console.log(reviews)
        this.setState({
          tvReviews: reviews,
        });
      });
  };

  componentWillMount() {
    this.fetchMovieReviews(this.props.sessionToken);
    this.fetchTVReviews(this.props.sessionToken);
  }

  render() {
    return (
      <div>
        <h2>Welcome!</h2>
        <MovieIndex
          sessionToken={this.props.sessionToken}
          movieReviews={this.state.movieReviews}
          fetchMovieReviews={this.fetchMovieReviews}
        />

        <TVIndex
          sessionToken={this.props.sessionToken}
          tvReviews={this.state.tvReviews}
          fetchTVReviews={this.fetchTVReviews}
        />
      </div>
    );
  }
}

export default UserHome;
