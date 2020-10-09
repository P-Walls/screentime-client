import React, { Component } from "react";
import TVEdit from "./TVEdit";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
//import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

class TVReviews extends Component {
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
    this.props.fetchTVReviews(this.props.sessionToken);
  }

  deleteMedia(id) {
    if (id !== "") {
      let url = `http://localhost:3025/tv/review/${id}`;
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

  tvMapper = () => {
    //console.log(props.tvReviews);
    return this.props.tvReviews.map((tvShows, index) => {
      return (
        <TableRow key={index} hover>
          <TableCell></TableCell>
          <TableCell>{tvShows.title}</TableCell>
          <TableCell>{tvShows.network}</TableCell>
          <TableCell>{tvShows.seasons}</TableCell>
          {/* <TableCell>{tvShows.watchlist}</TableCell> */}
          <TableCell>{tvShows.userScore}</TableCell>
          <TableCell>{tvShows.review}</TableCell>
          {/* <TableCell>{tvShows.id}</TableCell> */}
          <TableCell>
            <ButtonGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.props.editUpdateTV(tvShows);
                  this.props.updateOn();
                }}
              >
                Edit Score/Review
              </Button>
              <Button
                color="secondary"
                onClick={(e) => this.getDeleteId(e, tvShows.id)}
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
    return (
      <div>
        <TableContainer component={Paper}>
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
                {/* <TableCell>Watchlist</TableCell> */}
                <TableCell>My Score</TableCell>
                <TableCell>My Review</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.tvMapper()}</TableBody>
          </Table>
        </TableContainer>
        {this.props.updateActive ? (
          <TVEdit
            updateOn={this.props.updateOn}
            tvToUpdate={this.props.tvToUpdate}
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

export default TVReviews;