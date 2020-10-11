import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";

type AcceptedProps = {
  userScore: number | string;
  review: string;
  updateOn: () => void;
  updateOff: () => void;
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
};

class TVEdit extends Component<AcceptedProps, TVEditState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      editUserScore: this.props.tvToUpdate.userScore,
      editReview: this.props.tvToUpdate.review,
    };
  }

  toggle = () => {
    this.props.updateOff();
  };

  tvUpdate = (e: React.FormEvent<any>) => {
    e.preventDefault();
    fetch(`http://localhost:3025/tv/review/${this.props.tvToUpdate.id}`, {
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
        <Container>
          <div>
            <h3>{this.props.tvToUpdate.title}</h3>
          </div>
          <form onSubmit={this.tvUpdate}>
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

export default TVEdit;
