import dbConnect from '../api/dbConnect';
import Todo from '../api/models/Todo';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TodoApp({ todos }) {
  return (
    <Container maxWidth="sm">
      <List>
        {todos.map(({ _id, task, isCompleted }) => {
          return (
            <ListItem
              key={_id}
              role={undefined}
              button
              divider
              // onClick={handleCompleteTodo(_id, isCompleted)}
            >
              <ListItemIcon>
                <Checkbox checked={isCompleted} />
              </ListItemIcon>
              <ListItemText
                id={_id}
                primary={task}
                style={{
                  textDecoration: isCompleted ? 'line-through' : 'none',
                }}
              />
              <ListItemSecondaryAction
              // onClick={() => {
              //   setTodoToBeDeleted(_id);
              //   handleClickOpen();
              // }}
              >
                <IconButton edge="end">
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const data = await Todo.find();

  const todos = data.map((doc) => {
    const todo = doc.toObject();
    todo._id = todo._id.toString();
    todo.created = todo.created.toString();
    todo.updated = todo.updated.toString();
    return todo;
  });

  return {
    props: {
      todos,
    },
  };
}
