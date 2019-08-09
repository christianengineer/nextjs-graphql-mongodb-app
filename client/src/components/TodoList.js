import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {gql} from 'apollo-boost';
import {useQuery, useMutation} from '@apollo/react-hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const GET_TODOS = gql`
  {
    todos {
      _id
      text
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      _id
      text
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation CompleteTodo($todoId: ID!, $completed: Boolean!) {
    completeTodo(todoId: $todoId, completed: $completed) {
      _id
      text
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      deletedCount
    }
  }
`;

export default function TodoList() {
  const classes = useStyles();
  const {loading, error, data, refetch, networkStatus} = useQuery(GET_TODOS, {
    notifyOnNetworkStatusChange: true,
  });
  const [addTodo] = useMutation(ADD_TODO, {
    update(
      cache,
      {
        data: {addTodo},
      },
    ) {
      const {todos} = cache.readQuery({query: GET_TODOS});
      cache.writeQuery({
        query: GET_TODOS,
        data: {todos: todos.concat([addTodo])},
      });
    },
  });
  const [completeTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [inputs, setInputs] = useState({
    text: '',
  });

  const handleInputs = (event) => {
    event.persist();
    setInputs((inputs) => ({
      [event.target.id]: event.target.value,
    }));
  };

  const handleAddTodo = (event) => {
    console.log('addtodo');
    event.preventDefault();
    addTodo({variables: {text: inputs.text}});
    setInputs((inputs) => ({
      text: '',
    }));
    console.log('added');
  };

  const handleToggle = (_id, completedArg) => () => {
    completeTodo({variables: {todoId: _id, completed: !completedArg}});
  };

  const handleDeleteTodo = (_id) => () => {
    console.log('deleted');
    deleteTodo({variables: {todoId: _id}});
    refetch();
  };

  if (networkStatus === 4) return <p>Refetching...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: :(</p>;

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <TextField
          id='text'
          value={inputs.text}
          label='+ Add todo'
          margin='normal'
          fullWidth
          variant='outlined'
          onChange={handleInputs}
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Submit
        </Button>
      </form>
      <List className={classes.root}>
        {data.todos.map(({_id, text, completed}) => {
          return (
            <ListItem
              key={_id}
              role={undefined}
              dense
              button
              onClick={handleToggle(_id, completed)}
            >
              <ListItemIcon>
                <Checkbox checked={completed} />
              </ListItemIcon>
              <ListItemText id={_id} primary={text} />
              <ListItemSecondaryAction onClick={handleDeleteTodo(_id)}>
                <IconButton edge='end'>
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
