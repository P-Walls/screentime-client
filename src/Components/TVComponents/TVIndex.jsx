import React, { Component } from "react";
import TVReviews from "./TVReviews";
//import "./TVIndex.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

class TVIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      network: "",
      seasons: 0,
      //watchlist: false,
      userScore: 0,
      review: "",
      TVToUpdate: {},
      updateActive: false,
    };
  }

  editUpdateTV = (tvReview) => {
    this.setState({ tvToUpdate: tvReview });
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

    fetch(`http://localhost:3025/tv/review`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
      body: JSON.stringify({
        title: this.state.title,
        network: this.state.network,
        seasons: this.state.seasons,
        //watchlist: this.state.watchlist,
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
          network: "",
          seasons: 0,
          //watchlist: false,
          userScore: 0,
          review: "",
        });
      })
      .then(() => this.props.fetchTVReviews(this.props.sessionToken))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Container maxWidth="lg">
          <Container maxWidth="lg">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <h3>Review a TV Show</h3>
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
                    label="Network"
                    type="text"
                    size="small"
                    style={{ margin: 8 }}
                    value={this.state.network}
                    onChange={(e) => this.setState({ network: e.target.value })}
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="Seasons"
                    type="number"
                    size="small"
                    style={{ margin: 8 }}
                    value={this.state.seasons}
                    onChange={(e) =>
                      this.setState({ seasons: e.target.value })
                    }
                    required
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
          <TVReviews
            tvReviews={this.props.tvReviews}
            fetchTVReviews={this.props.fetchTVReviews}
            sessionToken={this.props.sessionToken}
            editUpdateTV={this.editUpdateTV}
            tvToUpdate={this.state.TVToUpdate}
            updateOn={this.updateOn}
            updateOff={this.updateOff}
            updateActive={this.state.updateActive}
          />
        </Container>
      </div>
    );
  }
}

export default TVIndex;
