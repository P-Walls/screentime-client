import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieEdit from "./MovieEdit";
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
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    maxHeight: 150,
    width: "100%"
  }
}

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
    this.props.fetchMovieReviews(this.props.sessionToken);
  }

  deleteMedia(id) {
    if (id !== "") {
      let url = `https://${APIURL}/movie/review/${id}`;
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
                color="primary"
                onClick={() => {
                  this.props.editUpdateMovie(movies);
                  this.props.updateOn();
                }}
              >
                Edit Score/Review
              </Button>
              <Button
                color="secondary"
                onClick={(e) => this.getDeleteId(e, movies.id)}
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
    const { classes } = this.props;

    return (
      <div>
        <TableContainer className="reviews-table" component={Paper}>
          <Container>
            <h3>Movie Reviews</h3>
          </Container>
          <Table stickyHeader aria-label="sticky table" className={classes.root}>
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
        {this.props.updateActive ? (
          <MovieEdit
            updateOn={this.props.updateOn}
            movieToUpdate={this.props.movieToUpdate}
            updateOff={this.props.updateOff}
            sessionToken={this.props.sessionToken}
            fetchMovieReviews={this.props.fetchMovieReviews}
            updateActive={this.props.updateActive}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

Table.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(MovieReviews);
