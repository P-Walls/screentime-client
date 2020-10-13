import React, { Component } from "react";
import TVEdit from "./TVEdit";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import APIURL from "../../Helpers/environment";

// type TVReviewsState = {
//   deleteId: number;
// };

// type AcceptedProps = {
//   userScore: string | number;
//   review: string;
//   tvReviews: {
//     id: number;
//     title: string;
//     network: string;
//     seasons: any;
//     userScore: any;
//     review: string;
//   }[];
//   fetchTVReviews: (token: string) => void;
//   sessionToken: string;
//   editUpdateTV: (tvReviews: {
//     id: number;
//     title: string;
//     network: string;
//     seasons: any;
//     userScore: any;
//     review: string;
//   }) => void;
//   tvToUpdate: {
//     id: number;
//     title: string;
//     network: string;
//     seasons: any;
//     userScore: any;
//     review: string;
//   };
//   updateOn: () => void;
//   updateOff: () => void;
//   updateActive: boolean;
// };

class TVReviews extends Component/*<AcceptedProps, TVReviewsState>*/ {
  constructor(props/*: AcceptedProps*/) {
    super(props);
    this.state = {
      deleteId: 0,
    };
  }

  // componentDidUpdate() {
  //   console.log(this.state.deleteId);

  // }

  getDeleteId(e/*: React.FormEvent<any>*/, id/*: number*/) {
    e.preventDefault();
    this.setState({ deleteId: id });
    this.deleteMedia(id);
    this.props.fetchTVReviews(this.props.sessionToken);
  }

  deleteMedia(id/*: number*/) {
    if (id !== null) {
      let url = `https://${APIURL}/tv/review/${id}`;
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
    return this.props.tvReviews.map((
      tvReviews /*: {
          id: number;
          title: string;
          network: string;
          seasons: number | string;
          userScore: number | string;
          review: string;
        }*/,
      index /*: number*/
    ) => {
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
                color="primary"
                onClick={() => {
                  this.props.editUpdateTV(tvReviews);
                  this.props.updateOn();
                }}
              >
                Edit Score/Review
              </Button>
              <Button
                color="secondary"
                onClick={(e) => this.getDeleteId(e, tvReviews.id)}
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
        <TableContainer className="reviews-table" component={Paper}>
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
        {this.props.updateActive ? (
          <TVEdit
            userScore={this.props.userScore}
            review={this.props.review}
            updateOn={this.props.updateOn}
            tvToUpdate={this.props.tvToUpdate}
            updateOff={this.props.updateOff}
            sessionToken={this.props.sessionToken}
            fetchTVReviews={this.props.fetchTVReviews}
            updateActive={this.props.updateActive}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default TVReviews;
