import React from 'react';
import TodoList from './components/TodoList';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container maxWidth='sm'>
      <TodoList />
    </Container>
  );
}

export default App;
