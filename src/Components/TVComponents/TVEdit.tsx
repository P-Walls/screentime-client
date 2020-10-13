import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import APIURL from "../../Helpers/environment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

type AcceptedProps = {
  userScore: number | string;
  review: string;
  updateOn: () => void;
  updateOff: () => void;
  updateActive: boolean;
  tvToUpdate: {
    id: number;
    title: string;
    network: string;
    seasons: number;
    userScore: number | string;
    review: string;
  };
  sessionToken: string;
  fetchTVReviews: (token: string) => void;
};

type TVEditState = {
  editUserScore: number | string;
  editReview: string;
  //open: boolean;
};

class TVEdit extends Component<AcceptedProps, TVEditState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      editUserScore: this.props.tvToUpdate.userScore,
      editReview: this.props.tvToUpdate.review,
      //open: false,
    };
  }

  // handleOpen = () => {
  //   this.setState({open: true});
  // }

  // handleClose = () => {
  //   this.setState({ open: false });
  // }

  toggle = () => {
    this.props.updateOff();
  };

  tvUpdate = (e: React.FormEvent<any>) => {
    e.preventDefault();
    fetch(`http://${APIURL}/tv/review/${this.props.tvToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        userScore: this.state.editUserScore,
        review: this.state.editReview,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((res) => {
      this.props.fetchTVReviews(this.props.sessionToken);
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
              Edit your score and review for {this.props.tvToUpdate.title}
            </DialogTitle>
          </div>
          <DialogContent>
            <form onSubmit={this.tvUpdate}>
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

export default TVEdit;
