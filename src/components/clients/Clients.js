import React from "react";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

import ClientCards from "./ClientCards";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

class Clients extends React.Component {
  isEmpty = obj => {
    if (Object.entries(obj).length > 0 && obj.constructor === Object) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { userData } = this.props;
    if (this.isEmpty(userData)) {
      const { clients } = userData;
      if (clients.length === 0) {
        return (
          <Typography variant="h6" style={{ textAlign: "center" }}>
            You have no clients to show. Add one using the button below.
          </Typography>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            {clients.map(client => (
              <ClientCards client={client} key={client.id} />
            ))}
          </div>
        );
      }
    } else {
      return <LinearProgress style={{ root: { flexGrow: 1 } }} />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = state => ({
  userData: state.firestore.ordered
});

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({
    auth
  })),
  firestoreConnect(props => [
    {
      collection: "users",
      doc: props.auth.uid,
      subcollections: [{ collection: "clients" }],
      storeAs: "clients"
    }
  ]),
  connect(mapStateToProps)
)(Clients);
