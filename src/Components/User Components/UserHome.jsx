import React, { Component } from "react";
import MovieIndex from "../MovieComponents/MovieIndex";

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieReviews: [],
    };
    //this.fetchReviews.bind(this);
  }

  fetchReviews = (token) => {
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
  }

  componentWillMount() {
    this.fetchReviews(this.props.sessionToken);
  }

  componentDidUpdate() {
    console.log(this.state.movieReviews);
  }

  render() {
    return (
      <div>
        <h2>Welcome, User!</h2>
        <nav>
          <li></li>
        </nav>
        <MovieIndex
          sessionToken={this.props.sessionToken}
          movieReviews={this.state.movieReviews}
          fetchReviews={this.fetchReviews}
        />
      </div>
    );
  }
}

export default UserHome;
