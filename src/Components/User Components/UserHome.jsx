import React, { Component } from "react";
import MovieIndex from "../MovieComponents/MovieIndex";
import TVIndex from "../TVComponents/TVIndex";

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieReviews: [],
      tvReviews: [],
    };
    //this.fetchReviews.bind(this);
  }

  fetchMovieReviews = (token) => {
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

  fetchTVReviews = (token) => {
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

  // componentDidUpdate() {
  //   console.log(this.state.movieReviews);
  //   console.log(this.state.tvReviews);
  // }

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
