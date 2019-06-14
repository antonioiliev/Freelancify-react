import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: "auto",
    marginBottom: 0,
    padding: 10
  },
  typography: {
    fontSize: 12
  }
}));

function Footer() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <Typography className={classes.typography} align="center" variant="body1">
        Copyright © 2019 ALPIBO ALL RIGHTS RESERVED
      </Typography>
    </Paper>
  );
}
export default Footer;
