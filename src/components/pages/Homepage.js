import React from "react";
import { makeStyles } from "@material-ui/styles";

import BackgroundImage from "../../assets/homepage/freelancify-background-whitebg.svg";
import ClientDashboardImage from "../../assets/homepage/client-dashboard.png";
import ClientTasksImage from "../../assets/homepage/deisgn-and-edit-tasks.jpg";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/Done";

import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  parentDiv: {
    height: "550px",
    [theme.breakpoints.down("xs")]: {
      height: "400px"
    },
    background: "linear-gradient(#ff9d2f, #ff6126)",
    zIndex: 0
  },
  backgroundDiv: {
    height: "100%",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPositionX: "right",
    backgroundPositionY: "bottom",
    [theme.breakpoints.down("sm")]: {
      backgroundImage: "none"
    },
    zIndex: 20
  },
  gridItem: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 150,
    [theme.breakpoints.down("sm")]: {
      marginTop: 100
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 50
    }
  },
  button: {
    marginTop: 20
  },
  white: {
    color: "#fff",
    textAlign: "center"
  },
  svg: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    position: "absolute",
    bottom: "40px",
    height: "220px",
    width: "100%",
    zIndex: -1
  },
  paperBackground: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5
  },
  h2: {
    color: "gray",
    fontWeight: 900,
    textTransform: "uppercase"
  },
  hr: {
    width: "20%",
    border: "2px solid #ff9d2f"
  },
  listItem: {
    justifyContent: "center"
  },
  listItemText: {
    flex: "none"
  },
  listItemIcon: {
    minWidth: 30
  },
  listIcon: {
    color: "#00b200"
  },
  gridItemLeft: {
    [theme.breakpoints.down("xs")]: {
      order: 2
    }
  },
  gridItemRight: {
    [theme.breakpoints.down("xs")]: {
      order: 1
    }
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Homepage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.parentDiv}>
        <div className={classes.backgroundDiv}>
          <Grid container>
            <Grid item md={1} />
            <Grid
              item
              md={6}
              className={classes.gridItem}
              style={{ color: "#fff" }}
            >
              <h1>Handle all of your clients in one place</h1>
              <p>
                Add, edit and delete client related information from your
                personalised dashboard.
              </p>
              <Button
                variant="contained"
                color="secondary"
                component={AdapterLink}
                to="/dashboard"
                className={classes.button}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item md={5} />
          </Grid>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className={classes.svg}
        >
          <polygon
            fill="#fff"
            points="0,0 30,100 65,21 90,100 100,75 100,100 0,100"
          />
          <polygon
            fill="#fff"
            points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100"
          />
        </svg>
      </div>
      <div style={{ paddingTop: 100 }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "gray"
          }}
        >
          Packed with cool features
        </h1>
        <hr className={classes.hr} />
        <Container maxWidth="lg" style={{ textAlign: "center", marginTop: 50 }}>
          <Paper className={classes.paperBackground}>
            <Grid container spacing={3} alignItems="center">
              <Grid item sm={6} className={classes.gridItemLeft}>
                <h2 className={classes.h2}>
                  Manage your clients in a sleek dashboard
                </h2>
                <hr className={classes.hr} />
                <List dense={true}>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ListIcon className={classes.listIcon} />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItemText}
                      primary="Add new clients"
                    />
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ListIcon className={classes.listIcon} />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItemText}
                      primary="Edit existing clients"
                    />
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ListIcon className={classes.listIcon} />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItemText}
                      primary="Delete unnecessary clients"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item sm={6} className={classes.gridItemRight}>
                <img
                  src={ClientDashboardImage}
                  alt="Freelancify client dashboard"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <Container
          maxWidth="lg"
          style={{ textAlign: "center", marginBottom: 150 }}
        >
          <Paper className={classes.paperBackground}>
            <Grid container spacing={3} alignItems="center">
              <Grid item sm={6} className={classes.gridItemLeft}>
                <img
                  src={ClientTasksImage}
                  alt="Freelancify client`s tasks dashboard"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item sm={6} className={classes.gridItemRight}>
                <h2 className={classes.h2}>
                  Manage each client`s tasks separately
                </h2>
                <hr className={classes.hr} />
                <List dense={true}>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ListIcon className={classes.listIcon} />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItemText}
                      primary="Add new tasks"
                    />
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ListIcon className={classes.listIcon} />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItemText}
                      primary="Edit and delete tasks"
                    />
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ListIcon className={classes.listIcon} />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItemText}
                      primary="Make sure you stay on top of them"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
