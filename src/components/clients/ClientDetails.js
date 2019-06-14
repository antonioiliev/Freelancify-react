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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import ConfirmEditIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Close";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 20
  },
  cardHeader: {
    background: "#ff9d2f",
    color: "#fff"
  },
  titleFontSize: {
    fontSize: "18px",
    fontWeight: 500
  },
  typographyWeight: {
    fontWeight: 600
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  iconLeft: {
    marginRight: 5
  },
  textField: {
    marginTop: 0,
    width: "auto"
  },
  input: {
    padding: 0
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
  green: {
    color: "#00ff00"
  },
  red: {
    color: "#ff0000"
  },
  span: {
    fontWeight: 100
  },
  listText: {
    wordBreak: "break-all",
    paddingRight: 50
  }
}));

const ClientDetails = props => {
  const classes = useStyles();
  const { client } = props;
  const [fieldToEdit, setFieldToEdit] = React.useState({
    field: "",
    value: ""
  });

  const editAction = (e, field, action) => {
    let fieldUpdates;

    switch (action) {
      case "typing":
        setFieldToEdit({ field: field, value: e.target.value });
        break;
      case "confirm-edit":
        const { firestore, auth } = props;
        fieldUpdates = {
          [field]: fieldToEdit.value
        };
        firestore
          .update(
            {
              collection: "users",
              doc: auth.uid,
              subcollections: [{ collection: "clients", doc: client.id }]
            },
            fieldUpdates
          )
          .then(setFieldToEdit({ field: "", value: "" }));
        break;
    }
  };

  const deleteClient = () => {
    const { firestore, client, history, auth } = props;

    firestore
      .delete({
        collection: "users",
        doc: auth.uid,
        subcollections: [{ collection: "clients", doc: client.id }]
      })
      .then(() => {
        history.push("/dashboard");
      });
  };

  if (client) {
    return (
      <Container maxWidth="md" className={classes.container}>
        <Button color="primary" component={AdapterLink} to="/dashboard">
          <ArrowLeft className={classes.iconLeft} /> Back to the dashboard
        </Button>
        <Card elevation={3} className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            classes={{ title: classes.titleFontSize }}
            action={
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => deleteClient()}
                  className={classes.white}
                  aria-label="Delete"
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            }
            title={"Edit " + client.name + "`s info"}
          />
          <CardContent>
            <List className={classes.root}>
              {/*Client`s name*/}
              <ListItem>
                <ListItemText className={classes.listText}>
                  {fieldToEdit.field === "name" ? (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Name:{" "}
                      <span className={classes.span}>
                        <TextField
                          id="edit-name-field"
                          className={classes.textField}
                          style={{ input: classes.input }}
                          value={fieldToEdit.value}
                          onChange={e => editAction(e, "name", "typing")}
                          margin="normal"
                          required
                          fullWidth
                        />
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Name: <span className={classes.span}>{client.name}</span>
                    </Typography>
                  )}
                </ListItemText>
                <ListItemSecondaryAction>
                  {fieldToEdit.field === "name" ? (
                    <React.Fragment>
                      <Tooltip title="Confirm edit">
                        <IconButton
                          edge="end"
                          className={classes.green}
                          aria-label="Confirm edit"
                          onClick={e => editAction(e, "name", "confirm-edit")}
                        >
                          <ConfirmEditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          edge="end"
                          className={classes.red}
                          aria-label="Cancel edit"
                          onClick={() =>
                            setFieldToEdit({ field: "", value: "" })
                          }
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Tooltip title="Edit name">
                        <IconButton
                          edge="end"
                          aria-label="Edit name"
                          color="primary"
                          onClick={() =>
                            setFieldToEdit({
                              field: "name",
                              value: client.name
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              {/*Clients email*/}
              <ListItem>
                <ListItemText className={classes.listText}>
                  {fieldToEdit.field === "email" ? (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Email:{" "}
                      <span className={classes.span}>
                        <TextField
                          id="edit-email-field"
                          className={classes.textField}
                          style={{ input: classes.input }}
                          value={fieldToEdit.value}
                          onChange={e => editAction(e, "email", "typing")}
                          margin="normal"
                          required
                          fullWidth
                        />
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Email:{" "}
                      <span className={classes.span}>{client.email}</span>
                    </Typography>
                  )}
                </ListItemText>
                <ListItemSecondaryAction>
                  {fieldToEdit.field === "email" ? (
                    <React.Fragment>
                      <Tooltip title="Confirm edit">
                        <IconButton
                          edge="end"
                          className={classes.green}
                          aria-label="Confirm edit"
                          onClick={e => editAction(e, "email", "confirm-edit")}
                        >
                          <ConfirmEditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          edge="end"
                          className={classes.red}
                          aria-label="Cancel edit"
                          onClick={() =>
                            setFieldToEdit({ field: "", value: "" })
                          }
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Tooltip title="Edit email">
                        <IconButton
                          edge="end"
                          aria-label="Edit email"
                          color="primary"
                          onClick={() =>
                            setFieldToEdit({
                              field: "email",
                              value: client.email
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )}
                </ListItemSecondaryAction>
              </ListItem>

              {/*Clients phone*/}

              <ListItem>
                <ListItemText className={classes.listText}>
                  {fieldToEdit.field === "phone" ? (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Phone:{" "}
                      <span className={classes.span}>
                        <TextField
                          id="edit-phone-field"
                          className={classes.textField}
                          style={{ input: classes.input }}
                          value={fieldToEdit.value}
                          onChange={e => editAction(e, "phone", "typing")}
                          margin="normal"
                          required
                          fullWidth
                        />
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Phone:{" "}
                      <span className={classes.span}>{client.phone}</span>
                    </Typography>
                  )}
                </ListItemText>
                <ListItemSecondaryAction>
                  {fieldToEdit.field === "phone" ? (
                    <React.Fragment>
                      <Tooltip title="Confirm edit">
                        <IconButton
                          edge="end"
                          className={classes.green}
                          aria-label="Confirm edit"
                          onClick={e => editAction(e, "phone", "confirm-edit")}
                        >
                          <ConfirmEditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          edge="end"
                          className={classes.red}
                          aria-label="Cancel edit"
                          onClick={() =>
                            setFieldToEdit({ field: "", value: "" })
                          }
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Tooltip title="Edit phone">
                        <IconButton
                          edge="end"
                          aria-label="Edit phone"
                          color="primary"
                          onClick={() =>
                            setFieldToEdit({
                              field: "phone",
                              value: client.phone
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )}
                </ListItemSecondaryAction>
              </ListItem>

              {/*Client balance*/}

              <ListItem>
                <ListItemText className={classes.listText}>
                  {fieldToEdit.field === "balance" ? (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Balance:{" "}
                      <span className={classes.span}>
                        <TextField
                          id="edit-balance-field"
                          className={classes.textField}
                          style={{ input: classes.input }}
                          value={fieldToEdit.value}
                          onChange={e => editAction(e, "balance", "typing")}
                          margin="normal"
                          required
                          fullWidth
                        />
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Balance:{" "}
                      <span className={classes.span}>
                        ${parseFloat(client.balance).toFixed(2)}
                      </span>
                    </Typography>
                  )}
                </ListItemText>
                <ListItemSecondaryAction>
                  {fieldToEdit.field === "balance" ? (
                    <React.Fragment>
                      <Tooltip title="Confirm edit">
                        <IconButton
                          edge="end"
                          className={classes.green}
                          aria-label="Confirm edit"
                          onClick={e =>
                            editAction(e, "balance", "confirm-edit")
                          }
                        >
                          <ConfirmEditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          edge="end"
                          className={classes.red}
                          aria-label="Cancel edit"
                          onClick={() =>
                            setFieldToEdit({ field: "", value: "" })
                          }
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Tooltip title="Edit balance">
                        <IconButton
                          edge="end"
                          aria-label="Edit balance"
                          color="primary"
                          onClick={() =>
                            setFieldToEdit({
                              field: "balance",
                              value: parseFloat(client.balance).toFixed(2)
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )}
                </ListItemSecondaryAction>
              </ListItem>

              {/*Client notes*/}

              <ListItem>
                <ListItemText className={classes.listText}>
                  {fieldToEdit.field === "notes" ? (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Notes:{" "}
                      <span className={classes.span}>
                        <TextField
                          id="edit-notes-field"
                          className={classes.textField}
                          style={{ width: "100%" }}
                          value={fieldToEdit.value}
                          onChange={e => editAction(e, "notes", "typing")}
                          margin="normal"
                          required
                          fullWidth
                        />
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.typographyWeight}
                      component="h5"
                    >
                      Notes:{" "}
                      <span className={classes.span}>{client.notes}</span>
                    </Typography>
                  )}
                </ListItemText>
                <ListItemSecondaryAction>
                  {fieldToEdit.field === "notes" ? (
                    <React.Fragment>
                      <Tooltip title="Confirm edit">
                        <IconButton
                          edge="end"
                          className={classes.green}
                          aria-label="Confirm edit"
                          onClick={e => editAction(e, "notes", "confirm-edit")}
                        >
                          <ConfirmEditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          edge="end"
                          className={classes.red}
                          aria-label="Cancel edit"
                          onClick={() =>
                            setFieldToEdit({ field: "", value: "" })
                          }
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Tooltip title="Edit notes">
                        <IconButton
                          edge="end"
                          aria-label="Edit notes"
                          color="primary"
                          onClick={() =>
                            setFieldToEdit({
                              field: "notes",
                              value: client.notes
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Container>
    );
  } else {
    return <LinearProgress style={{ root: { flexGrow: 1 } }} />;
  }
};

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
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
)(ClientDetails);
