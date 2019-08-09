import React from 'react';
import './App.css';
import {ApolloProvider} from '@apollo/react-hooks';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <div>TODO LIST</div>
      </div>
    </ApolloProvider>
  );
}

export default App;
