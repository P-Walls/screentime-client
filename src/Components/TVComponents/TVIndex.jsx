import React, { Component } from "react";
import TVReviews from "./TVReviews";
import "./TVIndex.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import APIURL from "../../Helpers/environment";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// type TVState = {
//   title: string;
//   network: string;
//   seasons: any;
//   userScore: any;
//   review: string;
//   tvToUpdate: {
//     id: number;
//     title: string;
//     network: string;
//     seasons: any;
//     userScore: any;
//     review: string;
//   };
//   updateActive: boolean;
// };

// type AcceptedProps = {
//   sessionToken: string;
//   fetchTVReviews: (token: string) => void;
//   tvReviews: {
//     id: number;
//     title: string;
//     network: string;
//     seasons: any;
//     userScore: any;
//     review: string;
//   }[];
// editUpdateTV: (tvReviews: {
//   id: number;
//   title: string;
//   network: string;
//   seasons: any;
//   userScore: any;
//   review: string;
// }) => void;
// };

class TVIndex extends Component /*<AcceptedProps, TVState>*/ {
  constructor(props /*: AcceptedProps*/) {
    super(props);
    this.state = {
      tvReviews: [],
      title: "",
      network: "",
      seasons: 0,
      userScore: 0,
      review: "",
      tvToUpdate: {
        id: 0,
        title: "",
        network: "",
        seasons: 0,
        userScore: 0,
        review: "",
      },
      updateActive: false,
    };
  }

  editUpdateTV = (
    tvReviews /*: {
    id: 0;
    title: "";
    network: "";
    seasons: "";
    userScore: "";
    review: "";
  }*/
  ) => {
    this.setState({ tvToUpdate: tvReviews });
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  fetchTVReviews = (token /*: string*/) => { // Commenting so that I'm able to redeploy
    fetch(`${APIURL}/tv/`, {
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
    //this.fetchMovieReviews(this.props.sessionToken);
    this.fetchTVReviews(this.props.sessionToken);
  }

  handleSubmit = (e /*: React.FormEvent<any>*/) => {
    e.preventDefault();
    console.log(this.state.title);

    fetch(`${APIURL}/tv/review`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
      body: JSON.stringify({
        title: this.state.title,
        network: this.state.network,
        seasons: this.state.seasons,
        userScore: this.state.userScore,
        review: this.state.review,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          title: "",
          network: "",
          seasons: 0,
          userScore: 0,
          review: "",
        });
      })
      .then(() => this.fetchTVReviews(this.props.sessionToken))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="tv-index">
        <div className="extra-space"></div>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <Container>
                  <h3>Review a TV Show</h3>
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
                      label="Network"
                      type="text"
                      size="small"
                      style={{ margin: 8 }}
                      value={this.state.network}
                      onChange={(e) =>
                        this.setState({ network: e.target.value })
                      }
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
                      helperText="255 Character Limit"
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
              <TVReviews
                tvReviews={this.state.tvReviews}
                fetchTVReviews={this.fetchTVReviews}
                sessionToken={this.props.sessionToken}
                editUpdateTV={this.editUpdateTV}
                tvToUpdate={this.state.tvToUpdate}
                updateOn={this.updateOn}
                updateOff={this.updateOff}
                updateActive={this.state.updateActive}
              />
            </Paper>
          </Grid>
        </Grid>
        <div className="extra-space"></div>
      </div>
    );
  }
}

export default TVIndex;
