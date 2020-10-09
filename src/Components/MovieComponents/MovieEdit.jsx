import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";

class MovieEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //editWatchlist: this.props.movieToUpdate.watchlist,
      editUserScore: this.props.movieToUpdate.userScore,
      editReview: this.props.movieToUpdate.review,
    };
  }

  toggle = () => {
    this.props.updateOff();
  };

  movieUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3025/movie/review/${this.props.movieToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        //watchlist: this.state.editWatchlist,
        userScore: this.state.editUserScore,
        review: this.state.editReview,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((res) => {
      this.props.fetchMovieReviews(this.props.sessionToken);
      console.log(res);
      this.props.updateOff();
    });
  };

  render() {
    return (
      <div>
        <Container>
          <div>
            <h3>{this.props.movieToUpdate.title}</h3>
          </div>
          <form onSubmit={this.movieUpdate}>
            {/* <label htmlFor="watchlist">Watchlist: </label>
          <input
            type="checkbox"
            name="watchlist"
            value={this.state.editWatchlist}
            onChange={(e) => this.setState({ editWatchlist: e.target.value })}
          /> */}
            <FormGroup row>
              <label htmlFor="userScore">Edit Score: </label>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                name="userScore"
                value={this.state.editUserScore}
                onChange={(e) =>
                  this.setState({ editUserScore: e.target.value })
                }
              />
              <label htmlFor="Review">Edit Review: </label>
              <TextField
                fullWidth
                multiline
                variant="outlined"
                size="small"
                type="text"
                name="review"
                value={this.state.editReview}
                onChange={(e) => this.setState({ editReview: e.target.value })}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>{" "}
            <Button onClick={this.toggle}>Cancel</Button>
          </form>
        </Container>
      </div>
    );
  }
}

export default MovieEdit;
