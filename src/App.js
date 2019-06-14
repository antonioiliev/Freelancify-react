import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./components/helpers/auth";
import { Provider } from "react-redux";
import store from "./store";

import Homepage from "./components/pages/Homepage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import ClientTasks from "./components/clients/ClientTasks";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  const defaultTheme = createMuiTheme();
  const theme = createMuiTheme({
    overrides: {
      MuiPaper: {
        root: {
          padding: "20px",
          marginBottom: "20px",
          [defaultTheme.breakpoints.down("sm")]: {
            paddingRight: 0,
            paddingLeft: 0
          }
        }
      }
    },
    palette: {
      primary: {
        main: "#ff9d2f",
        contrastText: "#fff"
      },
      secondary: {
        main: "#fff",
        contrastText: "#ff9d2f"
      }
    }
  });
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Header />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route
                exact
                path="/dashboard"
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                exact
                path="/clients/add"
                component={UserIsAuthenticated(AddClient)}
              />
              <Route
                exact
                path="/clients/:id"
                component={UserIsAuthenticated(ClientDetails)}
              />
              <Route
                exact
                path="/clients/tasks/:id"
                component={UserIsAuthenticated(ClientTasks)}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />
            </Switch>
            <Footer />
          </ThemeProvider>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
