import React, { Component } from "react";
import MovieReviews from "./MovieReviews";
import "./MovieIndex.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

class MovieIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      year: "",
      director: "",
      //watchlist: false,
      runtime: 0,
      userScore: 0,
      review: "",
      movieToUpdate: {},
      updateActive: false,
    };
  }

  editUpdateMovie = (movieReview) => {
    this.setState({ movieToUpdate: movieReview });
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

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
        //watchlist: this.state.watchlist,
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
          //watchlist: false,
          runtime: 0,
          userScore: 0,
          review: "",
        });
      })
      .then(() => this.props.fetchMovieReviews(this.props.sessionToken))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Container maxWidth="lg">
          <Container maxWidth="lg">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <h3>Review a Movie</h3>
              <div>
                <FormGroup row>
                  <TextField
                    variant="outlined"
                    label="Title"
                    type="text"
                    size="small"
                    style={{ margin: 8 }}
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="Release Year"
                    type="text"
                    size="small"
                    style={{ margin: 8 }}
                    value={this.state.year}
                    onChange={(e) => this.setState({ year: e.target.value })}
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="Director"
                    type="text"
                    size="small"
                    style={{ margin: 8 }}
                    value={this.state.director}
                    onChange={(e) =>
                      this.setState({ director: e.target.value })
                    }
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="Runtime"
                    size="small"
                    type="number"
                    style={{ margin: 8 }}
                    value={this.state.runtime}
                    // endAdornment={
                    //   <InputAdornment position="end">Min</InputAdornment>
                    // }
                    onChange={(e) => this.setState({ runtime: e.target.value })}
                  />
                </FormGroup>
                <FormGroup row>
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        value="false"
                        onChange={(e) =>
                          this.setState({ watchlist: e.target.value })
                        }
                      />
                    }
                    htmlFor="watchlist"
                    style={{ margin: "1px" }}
                    label="Watchlist: "
                    labelPlacement="start"
                    style={{ margin: 8 }}
                  /> */}

                  <TextField
                    variant="outlined"
                    label="My Score"
                    size="small"
                    style={{ margin: 8 }}
                    type="number"
                    helperText="Out of 10"
                    value={this.state.userScore}
                    min="0"
                    max="10"
                    onChange={(e) =>
                      this.setState({ userScore: e.target.value })
                    }
                  />
                  {/* </FormGroup>
                <FormGroup> */}
                  <TextField
                    variant="outlined"
                    label="My Review"
                    size="small"
                    style={{ margin: 8 }}
                    id="review"
                    name="review"
                    multiline
                    fullWidth
                    value={this.state.review}
                    placeholder="Write a review here."
                    onChange={(e) => this.setState({ review: e.target.value })}
                  />
                </FormGroup>
              </div>
              <br />
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Container>
          <MovieReviews
            movieReviews={this.props.movieReviews}
            fetchMovieReviews={this.props.fetchMovieReviews}
            sessionToken={this.props.sessionToken}
            editUpdateMovie={this.editUpdateMovie}
            movieToUpdate={this.state.movieToUpdate}
            updateOn={this.updateOn}
            updateOff={this.updateOff}
            updateActive={this.state.updateActive}
          />
        </Container>
      </div>
    );
  }
}

export default MovieIndex;
