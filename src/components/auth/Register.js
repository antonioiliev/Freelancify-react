import React from "react";

import PropTypes from "prop-types";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Https";
import IconButton from "@material-ui/core/IconButton";

import { notifyUser } from "../../actions/notifyAction";
import Alert from "../layout/Alert";
import { Link } from "react-router-dom";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showPassword: false
    };
  }

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  handleChange = prop => event => {
    this.setState({ ...this.state, [prop]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .createUser({
        email,
        password
      })
      .catch(err => notifyUser(err.message, "error"));
  };

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <Container maxWidth="sm" style={{ marginTop: 100 }}>
        <Paper>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            variant="h5"
            component="h5"
          >
            <LockIcon />
            REGISTER
          </Typography>
          {message ? (
            <Alert message={message} messageType={messageType} />
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange("email")}
              type="email"
              margin="normal"
              required
              fullWidth
            />
            <FormControl required fullWidth>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <p>
              Already have an account?{" "}
              <Link color="primary" component={AdapterLink} to="/login">
                Login
              </Link>
            </p>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              type="submit"
              fullWidth
            >
              REGISTER
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object,
  notifyUser: PropTypes.func,
  history: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),

  connect(({ firebase: { auth } }) => ({
    auth
  })),
  firestoreConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Register);
