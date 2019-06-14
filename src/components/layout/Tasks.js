import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIconButton from "@material-ui/icons/Comment";
import ConfirmEditIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import CancelIcon from "@material-ui/icons/Close";
import { compose } from "redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Tooltip } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  listText: {
    wordBreak: "break-all",
    paddingRight: 50
  },
  red: {
    color: "#ff0000"
  }
}));

const Tasks = props => {
  const [tasks, updateTasks] = React.useState({});
  const [taskToEdit, updateTaskToEdit] = React.useState("");
  const [taskText, updateTaskText] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    //Sort the tasks by 'checked' property
    if (props.tasks !== undefined) {
      const sortedTasks = props.tasks.slice().sort(function(a, b) {
        return a.checked - b.checked;
      });
      updateTasks(sortedTasks);
    }
  }, [props.tasks]);

  const onChange = e => {
    updateTaskText(e.target.value);
  };

  const taskAction = (index, action) => {
    const { firestore, auth, client } = props;

    if (action === "toggle") {
      if (taskToEdit === "") {
        let fieldUpdates = {
          checked: !tasks[index].checked
        };
        firestore.update(
          {
            collection: "users",
            doc: auth.uid,
            subcollections: [
              { collection: "clients", doc: client },
              { collection: "tasks", doc: tasks[index].id }
            ]
          },
          fieldUpdates
        );
      }
    } else if (action === "delete") {
      firestore.delete({
        collection: "users",
        doc: auth.uid,
        subcollections: [
          { collection: "clients", doc: client },
          { collection: "tasks", doc: tasks[index].id }
        ]
      });
    } else if (action === "edit") {
      updateTaskToEdit(tasks[index].id);
      updateTaskText(tasks[index].text);
    } else if (action === "confirm-edit") {
      let fieldUpdates = {
        text: taskText
      };

      firestore.update(
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [
            { collection: "clients", doc: client },
            { collection: "tasks", doc: tasks[index].id }
          ]
        },
        fieldUpdates
      );
      updateTaskToEdit("");
    } else if (action === "cancel-edit") {
      updateTaskToEdit("");
    } else {
      return;
    }
  };

  if (tasks !== undefined) {
    if (tasks.length > 0) {
      return (
        <List className={classes.root}>
          {tasks.map((task, index) => {
            const labelId = `checkbox-list-label-${task.id}`;
            return (
              <ListItem
                key={task.id}
                button
                disableRipple
                onClick={() => taskAction(index, "toggle")}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.checked}
                    tabIndex={-1}
                    color="primary"
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} className={classes.listText}>
                  {taskToEdit === task.id ? (
                    <TextField
                      id="task-edit-field"
                      label="Task"
                      className={classes.textField}
                      value={taskText}
                      onChange={onChange}
                      margin="normal"
                      required
                      fullWidth
                    />
                  ) : (
                    task.text
                  )}
                </ListItemText>
                <ListItemSecondaryAction>
                  {taskToEdit === task.id ? (
                    <React.Fragment>
                      <Tooltip title="Confirm edit">
                        <IconButton
                          edge="end"
                          aria-label="Confirm edit"
                          onClick={() => taskAction(index, "confirm-edit")}
                        >
                          <ConfirmEditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          edge="end"
                          aria-label="Cancel edit"
                          onClick={() => taskAction(index, "cancel-edit")}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Tooltip title="Edit task">
                        <IconButton
                          edge="end"
                          aria-label="Edit task"
                          onClick={() => taskAction(index, "edit")}
                        >
                          <EditIconButton />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete task">
                        <IconButton
                          edge="end"
                          className={classes.red}
                          aria-label="Delete task"
                          onClick={() => taskAction(index, "delete")}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      );
    } else {
      return (
        <Typography variant="h6">
          You have no tasks for this client. Add one using the button below.
        </Typography>
      );
    }
  } else {
    return <LinearProgress style={{ root: { flexGrow: 1 } }} />;
  }
};

Tasks.propTypes = {
  firestore: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  client: PropTypes.string.isRequired,
  tasks: PropTypes.array
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
      subcollections: [
        { collection: "clients", doc: props.client },
        { collection: "tasks" }
      ],
      storeAs: "tasks"
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    tasks: ordered.tasks
  }))
)(Tasks);
