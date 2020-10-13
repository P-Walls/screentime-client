import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import APIURL from "../../Helpers/environment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    fetch(`http://${APIURL}/movie/review/${this.props.movieToUpdate.id}`, {
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
        <Dialog open={this.props.updateActive}>
          <div>
            <DialogTitle>
              <h3>
                Edit your score and review for {this.props.movieToUpdate.title}
              </h3>
            </DialogTitle>
          </div>
          <DialogContent>
            <form onSubmit={this.movieUpdate}>
              <FormGroup row>
                <TextField
                  label="Edit Score:"
                  variant="outlined"
                  size="small"
                  type="number"
                  name="userScore"
                  value={this.state.editUserScore}
                  onChange={(e) =>
                    this.setState({ editUserScore: e.target.value })
                  }
                />
              </FormGroup>
              <br />
              <FormGroup row>
                <TextField
                  label="Edit Review:"
                  fullWidth
                  multiline
                  variant="outlined"
                  size="small"
                  type="text"
                  name="review"
                  value={this.state.editReview}
                  onChange={(e) =>
                    this.setState({ editReview: e.target.value })
                  }
                />
              </FormGroup>
              <DialogActions>
                <Button type="submit" color="primary">
                  Submit
                </Button>{" "}
                <Button onClick={this.toggle} color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default MovieEdit;
