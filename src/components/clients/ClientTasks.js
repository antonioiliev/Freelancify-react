import React from "react";

import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

import { makeStyles, Tooltip } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import CardHeader from "@material-ui/core/CardHeader";

import Tasks from "../layout/Tasks";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 20
  },
  title: {
    background: theme.palette.primary.main,
    color: "#fff"
  },
  titleFontSize: {
    fontSize: "18px",
    fontWeight: 500
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  iconLeft: {
    marginRight: 5
  },
  textField: {
    marginRight: 200,
    width: 200
  },
  card: {
    padding: 0,
    minWidth: 275,
    marginTop: 20
  },
  pos: {
    marginBottom: 12
  },
  white: {
    color: "#ffffff"
  },
  span: {
    fontWeight: 100
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
  }
}));

const ClientTasks = props => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState("");

  const { client } = props;

  const handleClickToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const onChangeText = e => {
    setDialogValue(e.target.value);
  };

  const submitValue = e => {
    e.preventDefault();
    const { firestore, auth } = props;

    let addField = {
      checked: false,
      text: dialogValue
    };

    console.log(addField);
    firestore
      .add(
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [
            { collection: "clients", doc: client.id },
            { collection: "tasks" }
          ]
        },
        addField
      )
      .then(handleClickToggle, setDialogValue(""));
  };

  if (client) {
    return (
      <Container maxWidth="md" className={classes.container}>
        <Button color="primary" component={AdapterLink} to="/dashboard">
          <ArrowLeft className={classes.iconLeft} /> Back to the dashboard
        </Button>
        <Card elevation={3} className={classes.card}>
          <CardHeader
            className={classes.title}
            classes={{ title: classes.titleFontSize }}
            title={"Manage " + client.name + "`s tasks"}
          />
          <CardContent>
            <Tasks client={client.id} />
          </CardContent>
        </Card>
        <Tooltip title="Add a task">
          <Fab
            color="primary"
            className={classes.floatingButton}
            onClick={handleClickToggle}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <React.Fragment>
          <Dialog
            open={dialogOpen}
            onClose={handleClickToggle}
            aria-labelledby="form-dialog-title"
            style={{ minWidth: "350px" }}
          >
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="add-task"
                label="Add a task"
                type="text"
                value={dialogValue}
                onChange={onChangeText}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickToggle} color="primary">
                Cancel
              </Button>
              <Button onClick={submitValue} color="primary">
                Add task
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </Container>
    );
  } else {
    return <LinearProgress style={{ root: { flexGrow: 1 } }} />;
  }
};

ClientTasks.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({
    auth
  })),
  firestoreConnect(props => [
    {
      collection: "users",
      doc: props.auth.uid,
      subcollections: [{ collection: "clients", doc: props.match.params.id }],
      storeAs: "client"
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientTasks);
