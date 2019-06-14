import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const Alert = props => {
  const { message, messageType } = props;
  return messageType === "error" ? (
    <Typography
      style={{ textAlign: "center", margin: 20 }}
      display="block"
      color="error"
    >
      {message}
    </Typography>
  ) : (
    <Typography style={{ textAlign: "center", margin: 20 }} display="block">
      {message}
    </Typography>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Alert;
