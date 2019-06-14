import React, { Component } from "react";

import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ClientsIcon from "@material-ui/icons/PersonAdd";

import { Link } from "react-router-dom";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const styles = {
  flex: {
    display: "flex",
    alignItems: "center"
  },
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  iconLeft: {
    marginRight: 5
  },
  textField: {
    width: "100%"
  }
};

class AddClient extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    balance: "",
    notes: "Here you can add notes related to the client.",
    dateAdded: new Date().toLocaleString()
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;

    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    const { firestore, history, auth } = this.props;
    firestore
      .add(
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "clients" }]
        },
        newClient
      )
      .then(() => history.push("/dashboard"));
  };

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="md">
        <Button
          color="primary"
          component={AdapterLink}
          to="/dashboard"
          className={classes.button}
        >
          <ArrowLeft className={classes.iconLeft} /> Back to the dashboard
        </Button>
        <Paper>
          <Typography className={classes.flex} variant="h6" component="h6">
            <ClientsIcon className={classes.iconLeft} />
            Add a new client
          </Typography>

          <form onSubmit={this.onSubmit}>
            <TextField
              id="name"
              label="Name"
              placeholder="e.g John Doe"
              className={classes.textField}
              value={this.state.name}
              onChange={this.onChange}
              margin="normal"
              required
              fullWidth
            />
            <TextField
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              className={classes.textField}
              margin="normal"
              required
              fullWidth
            />
            <TextField
              id="phone"
              label="Mobile"
              value={this.state.phone}
              onChange={this.onChange}
              type="number"
              className={classes.textField}
              margin="normal"
              fullWidth
            />
            <InputLabel style={{ marginTop: 20 }} htmlFor="balance">
              Amount
            </InputLabel>
            <Input
              id="balance"
              value={this.state.balance}
              placeholder="0.00"
              onChange={this.onChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              type="submit"
              fullWidth
            >
              Add
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  firestoreConnect(),
  connect(state => ({
    auth: state.firebase.auth
  }))
)(AddClient);
