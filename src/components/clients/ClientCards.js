import React from "react";

import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card/index";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar/index";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Create";
import TasksIcon from "@material-ui/icons/DoneAll";
import ClearIcon from "@material-ui/icons/DeleteForever";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/PhonelinkRing";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClientAvatar from "../../assets/dashboard/woman-avatar.svg";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400
    },
    margin: "10px",
    padding: 0
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundSize: "580px",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "650px"
    }
  },
  actions: {},
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
  redText: {
    color: "#ff0000"
  },
  blueText: {
    color: "#0000ff"
  },
  balance: {
    color: "#ff0000",
    fontWeight: 900
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

function ClientCards(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { client } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteClient = id => {
    const { firestore, auth } = props;

    console.log(id);
    firestore.delete({
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "clients", doc: id }]
    });
  };

  return (
    <Card id={client.id} elevation={2} className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {client.name.charAt(0)}
          </Avatar>
        }
        action={
          <Tooltip title="Delete">
            <IconButton
              onClick={() => deleteClient(client.id)}
              className={classes.redText}
              aria-label="Delete"
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        }
        title={client.name}
        subheader={"Added on " + client.dateAdded}
      />
      <CardMedia
        className={classes.media}
        image={ClientAvatar}
        title="Client"
      />
      <CardContent>
        The client owes you: $
        <span className={classes.balance}>{client.balance}</span>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            aria-label="Edit client info"
            component={AdapterLink}
            to={`/clients/${client.id}`}
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tasks">
          <IconButton
            style={{ color: "#69BE28" }}
            aria-label="Client tasks"
            component={AdapterLink}
            to={`/clients/tasks/${client.id}`}
          >
            <TasksIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Email client">
          <IconButton
            href={`mailto:${client.email}`}
            className={classes.redText}
            aria-label="Email"
          >
            <EmailIcon />
          </IconButton>
        </Tooltip>

        {client.phone !== "" ? (
          <Tooltip title="Call client">
            <IconButton
              href={`tel:${client.phone}`}
              className={classes.blueText}
              aria-label="Phone"
            >
              <CallIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton className={classes.blueText} aria-label="Phone" disabled>
            <CallIcon />
          </IconButton>
        )}

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Notes:</Typography>
          <Typography paragraph>{client.notes}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect()
)(ClientCards);
