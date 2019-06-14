import React from "react";

import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

import Clients from "../clients/Clients";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
  overflowX: {
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      paddingLeft: 0
    }
  },
  floatingButton: {
    position: "fixed",
    margin: 0,
    top: "auto",
    right: 70,
    bottom: 80,
    [theme.breakpoints.down("sm")]: {
      right: 20,
      bottom: 50
    },
    left: "auto"
  },
  paper: {
    background: "transparent"
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.overflowX}>
      <Paper elevation={0} className={classes.paper}>
        <Clients />
        <Tooltip title="Add a client">
          <Button
            color={"primary"}
            className={classes.floatingButton}
            component={AdapterLink}
            to="/clients/add"
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </Paper>
    </Container>
  );
};

export default Dashboard;
