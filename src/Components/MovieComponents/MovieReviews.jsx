import React, { Component } from "react";
import MediaEdit from './MovieEdit';

class MovieReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: 0,
    };
  }

  // componentDidUpdate() {
  //   console.log(this.state.deleteId);

  // }

  getDeleteId(e, id) {
    e.preventDefault();
    this.setState({ deleteId: id });
    this.deleteMedia(id);
    this.props.fetchReviews(this.props.sessionToken);
  }

  deleteMedia(id) {
    if (id !== "") {
      let url = `http://localhost:3025/movie/review/${id}`;
      fetch(url, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((logdata) => {
          //console.log(logdata);
          this.setState({
            deleteId: 0,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  movieMapper = () => {
    //console.log(props.movieReviews);
    return this.props.movieReviews.map((movies, index) => {
      return (
        <tr key={index}>
          <td></td>
          <td>{movies.title}</td>
          <td>{movies.director}</td>
          <td>{movies.year}</td>
          <td>{movies.runtime}</td>
          <td>{movies.watchlist}</td>
          <td>{movies.userScore}</td>
          <td>{movies.review}</td>
          {/* <td>{movies.id}</td> */}
          <td>
            <button
              onClick={() => {
                this.props.editUpdateMovie(movies);
                this.props.updateOn();
              }}
            >
              Edit Score/Review
            </button>
          </td>
          <td>
            <button onClick={(e) => this.getDeleteId(e, movies.id)}>
              Delete Review
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <div>
          <h3>Movie Reviews</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Director</th>
              <th>Year</th>
              <th>Runtime</th>
              <th>Watchlist</th>
              <th>My Score</th>
              <th>My Review</th>
            </tr>
          </thead>
          <tbody>{this.movieMapper()}</tbody>
        </table>
        {this.props.updateActive ? (
          <MediaEdit
            updateOn={this.props.updateOn}
            movieToUpdate={this.props.movieToUpdate}
            updateOff={this.props.updateOff}
            sessionToken={this.props.sessionToken}
            fetchReviews={this.props.fetchReviews}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default MovieReviews;
