import React from 'react';
import Typography from '@material-ui/core/Typography';
import TodoList from './components/TodoList';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h3' align='center' gutterBottom>
        GraphQL Todo List!
      </Typography>
      <TodoList />
    </Container>
  );
}

export default App;
