import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      _id
      text
      completed
    }
  }
`;

export default function AddTodo() {
  const [inputs, setInputs] = useState({
    text: '',
  });

  const [addTodo] = useMutation(ADD_TODO);

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
  };

  return (
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
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleAddTodo}
      >
        Submit
      </Button>
    </form>
  );
}
