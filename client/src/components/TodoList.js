import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';

import {gql} from 'apollo-boost';

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

const COMPLETE_TODO = gql`
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
    deleteTodo(todoId: $todoId)
  }
`;

export default function TodoList() {
  const [inputs, setInputs] = useState({
    text: '',
  });

  const {loading, error, data} = useQuery(GET_TODOS);

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

  const [completeTodo] = useMutation(COMPLETE_TODO);

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(
      cache,
      {
        data: {deleteTodo},
      },
    ) {
      const {todos} = cache.readQuery({query: GET_TODOS});
      cache.writeQuery({
        query: GET_TODOS,
        data: {todos: todos.filter((todo) => todo._id !== deleteTodo)},
      });
    },
  });

  const handleInputs = (event) => {
    event.persist();
    setInputs((inputs) => ({
      [event.target.id]: event.target.value,
    }));
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    addTodo({variables: {text: inputs.text}});
    setInputs((inputs) => ({
      text: '',
    }));
  };

  const handleCompleteTodo = (_id, completedArg) => () => {
    completeTodo({variables: {todoId: _id, completed: !completedArg}});
  };

  const handleDeleteTodo = (_id) => () => {
    deleteTodo({variables: {todoId: _id}});
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

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
      <List>
        {data.todos.map(({_id, text, completed}) => {
          return (
            <ListItem
              key={_id}
              role={undefined}
              button
              divider
              onClick={handleCompleteTodo(_id, completed)}
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
