import React, { Component } from "react";
import MovieReviews from "./MovieReviews";
import "./MovieIndex.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import APIURL from "../../Helpers/environment";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class MovieIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieReviews: [],
      title: "",
      year: "",
      director: "",
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

  fetchMovieReviews = (token) => {
    fetch(`http://${APIURL}/movie/`, {
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

  componentWillMount() {
    this.fetchMovieReviews(this.props.sessionToken);
    //this.fetchTVReviews(this.props.sessionToken);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.title);

    fetch(`http://${APIURL}/movie/review`, {
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
      .then(() => this.fetchMovieReviews(this.props.sessionToken))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="movie-index">
        <div className="extra-space"></div>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <Container>
                  <h3>Review a Movie</h3>
                </Container>
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
                      onChange={(e) =>
                        this.setState({ runtime: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup row>
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
                      onChange={(e) =>
                        this.setState({ review: e.target.value })
                      }
                    />
                  </FormGroup>
                </div>
                <br />
                <Container>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Container>
                <br />
              </form>
            </Paper>
          </Grid>
          <Grid xs={8} item>
            <Paper>
              <MovieReviews
                movieReviews={this.state.movieReviews}
                fetchMovieReviews={this.fetchMovieReviews}
                sessionToken={this.props.sessionToken}
                editUpdateMovie={this.editUpdateMovie}
                movieToUpdate={this.state.movieToUpdate}
                updateOn={this.updateOn}
                updateOff={this.updateOff}
                updateActive={this.state.updateActive}
              />
            </Paper>
          </Grid>
        </Grid>
        <div className="extraSpace"></div>
      </div>
    );
  }
}

export default MovieIndex;
