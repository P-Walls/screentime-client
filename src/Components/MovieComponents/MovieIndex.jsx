import React, { Component } from "react";
import "./MovieIndex.css";

class MovieIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      year: "",
      director: "",
      watchlist: false,
      runtime: 0,
      userScore: 0,
      review: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.title);

    fetch(`http://localhost:3025/movie/review`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
      body: JSON.stringify({
        title: this.state.title,
        year: this.state.year,
        director: this.state.director,
        watchlist: this.state.watchlist,
        runtime: this.state.runtime,
        userScore: this.state.userScore,
        review: this.state.review,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //Come back to clearing the form
        this.setState({
          title: "",
          year: "",
          director: "",
          watchlist: false,
          runtime: 0,
          userScore: 0,
          review: "",
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Review a Movie</h3>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              onChange={(e) => this.setState({ title: e.target.value })}
              required
            />
            <label htmlFor="year">Release Date: </label>
            <input
              type="text"
              onChange={(e) => this.setState({ year: e.target.value })}
              required
            />
            <label htmlFor="director">Directed By: </label>
            <input
              type="text"
              onChange={(e) => this.setState({ director: e.target.value })}
              required
            />
            <label htmlFor="runtime">Runtime: </label>
            <input
              type="number"
              onChange={(e) => this.setState({ runtime: e.target.value })}
            />
            <label htmlFor="watchlist">Watchlist: </label>
            <input
              type="checkbox"
              onChange={(e) => this.setState({ watchlist: e.target.value })}
            />
            <label htmlFor="userScore">My Score: </label>
            <input
              type="number"
              min="0"
              max="10"
              onChange={(e) => this.setState({ userScore: e.target.value })}
            />
            <label htmlFor="review">My Review: </label>
            <textarea
              id="review"
              name="review"
              rows="4"
              cols="50"
              defaultValue="Write a movie review here."
              onChange={(e) => this.setState({ review: e.target.value })}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default MovieIndex;
