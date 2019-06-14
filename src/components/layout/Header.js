import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// Drawer
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LoginIcon from "@material-ui/icons/HowToReg";
import RegisterIcon from "@material-ui/icons/PersonPin";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/ClearAll";
import IconButton from "@material-ui/core/IconButton";

import Logo from "../../assets/logo/freelancify-logo-white.svg";

const useStyles = makeStyles(theme => ({
  appBar: {
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0
  },
  branding: {
    flexGrow: 1,
    color: "#fff",
    textDecoration: "none",
    fontWeight: "900"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

function Header(props) {
  const classes = useStyles();

  const [authenticated, setAuth] = React.useState(false);
  const [drawerState, setDrawerState] = React.useState({
    right: false
  });

  useEffect(() => {
    props.auth.firebase.auth.uid ? setAuth(true) : setAuth(false);
  }, [props.auth.firebase.auth.uid]);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      {authenticated && (
        <List>
          <ListItem button component={AdapterLink} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      )}
      {!authenticated && (
        <List>
          <ListItem button component={AdapterLink} to="/login">
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
          <ListItem button component={AdapterLink} to="/register">
            <ListItemIcon>
              <RegisterIcon />
            </ListItemIcon>
            <ListItemText primary={"Register"} />
          </ListItem>
        </List>
      )}
    </div>
  );

  const handleLogout = e => {
    e.preventDefault();
    const { firebase } = props;
    firebase.logout();
  };

  return (
    <div>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.branding}>
            <img src={Logo} alt="Alpibo`s Freelancify Logo" />
          </Link>
          <div>
            <IconButton
              aria-haspopup="true"
              onClick={toggleDrawer("right", true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerState.right}
              onClose={toggleDrawer("right", false)}
            >
              {sideList("right")}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Header);
