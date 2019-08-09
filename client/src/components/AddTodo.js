import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function AddTodo() {
  return (
    <form>
      <TextField
        id='outlined-uncontrolled'
        label='+ Add todo'
        margin='normal'
        fullWidth
        variant='outlined'
      />
      <Button variant='contained' color='primary' fullWidth>
        Submit
      </Button>
    </form>
  );
}
