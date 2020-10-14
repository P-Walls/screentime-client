import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import APIURL from "../../Helpers/environment";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./Admin.css";

const styles = {};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieReviews: [],
      tvReviews: [],
      deleteId: 0,
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  fetchMovieReviews = (token) => {
    fetch(`${APIURL}/movie/all`, {
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
    fetch(`${APIURL}/tv/all`, {
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

  componentDidMount() {
    console.log("test");
  }

  getTVDeleteId(e, id) {
    e.preventDefault();
    this.setState({ deleteId: id });
    this.deleteTV(id);
    this.fetchMovieReviews(this.props.sessionToken);
    this.fetchTVReviews(this.props.sessionToken);
  }

  getMovieDeleteId(e, id) {
    e.preventDefault();
    this.setState({ deleteId: id });
    this.deleteMovie(id);
    this.fetchMovieReviews(this.props.sessionToken);
    this.fetchTVReviews(this.props.sessionToken);
  }

  deleteMovie(id) {
    if (id !== "") {
      let url = `${APIURL}/movie/review/${id}`;
      fetch(url, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((logdata) => {
          this.setState({
            deleteId: 0,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  deleteTV(id /*: number*/) {
    if (id !== null) {
      let url = `${APIURL}/tv/review/${id}`;
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
    return this.state.movieReviews.map((movies, index) => {
      return (
        <TableRow key={index} hover>
          <TableCell></TableCell>
          <TableCell>{movies.title}</TableCell>
          <TableCell>{movies.director}</TableCell>
          <TableCell>{movies.year}</TableCell>
          <TableCell>{movies.runtime}</TableCell>
          <TableCell>{movies.userScore}</TableCell>
          <TableCell>{movies.review}</TableCell>
          {/* <TableCell>{movies.id}</TableCell> */}
          <TableCell>
            <ButtonGroup>
              <Button
                color="secondary"
                onClick={(e) => this.getMovieDeleteId(e, movies.id)}
              >
                Delete Review
              </Button>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      );
    });
  };

  tvMapper = () => {
    return this.state.tvReviews.map((tvReviews, index) => {
      return (
        <TableRow key={index} hover>
          <TableCell></TableCell>
          <TableCell>{tvReviews.title}</TableCell>
          <TableCell>{tvReviews.network}</TableCell>
          <TableCell>{tvReviews.seasons}</TableCell>
          <TableCell>{tvReviews.userScore}</TableCell>
          <TableCell>{tvReviews.review}</TableCell>
          <TableCell>
            <ButtonGroup>
              <Button
                color="secondary"
                onClick={(e) => this.getTVDeleteId(e, tvReviews.id)}
              >
                Delete Review
              </Button>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <div className="admin-index">
        <div className="extra-space"></div>
        <Grid container spacing={4}>
          <Grid item xs={10}>
            <TableContainer className="admin-table" component={Paper}>
              <Container>
                <h3>Movie Reviews</h3>
              </Container>
              <Table
                stickyHeader
                aria-label="sticky table"
                className={classes.root}
                value={value}
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Director</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Runtime</TableCell>
                    <TableCell>My Score</TableCell>
                    <TableCell>My Review</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.movieMapper()}</TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={10}>
            <TableContainer className="admin-table" component={Paper}>
              <div>
                <h3>TV Reviews</h3>
              </div>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Network</TableCell>
                    <TableCell>Seasons</TableCell>
                    <TableCell>My Score</TableCell>
                    <TableCell>My Review</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.tvMapper()}</TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <div className="extra-space"></div>
      </div>
    );
  }
}

Admin.propTypes = {
  class: PropTypes.object,
};

export default withStyles(styles)(Admin);
