import React from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container maxWidth='sm'>
      <AddTodo />
      <TodoList />
    </Container>
  );
}

export default App;
