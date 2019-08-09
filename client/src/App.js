import React from 'react';
import './App.css';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

function App() {
  const {loading, error, data} = useQuery(gql`
    {
      todos {
        _id
        text
        completed
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: :(</p>;

  return (
      <div className='App'>
        <div>
          {data.todos.map(({_id, text, completed}) => (
            <div key={_id}>{text}</div>
          ))}
        </div>
      </div>
  );
}

export default App;
