import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import {gql} from 'apollo-boost';
import {useQuery, useMutation} from '@apollo/react-hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const UPDATE_TODO = gql`
  mutation CompleteTodo($todoId: ID!, $completed: Boolean!) {
    completeTodo(todoId: $todoId, completed: $completed) {
      _id
      text
      completed
    }
  }
`;

export default function TodoList() {
  const classes = useStyles();
  const [completeTodo] = useMutation(UPDATE_TODO);

  const handleToggle = (_id) => () => {
    console.log(_id);
    completeTodo({variables: {todoId: _id, completed: true}});
  };

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
    <List className={classes.root}>
      {data.todos.map(({_id, text, completed}) => {
        const labelId = `checkbox-list-label-${_id}`;
        return (
          <ListItem
            key={_id}
            role={undefined}
            dense
            button
            onClick={handleToggle(_id)}
          >
            <ListItemIcon>
              <Checkbox
                edge='start'
                checked={completed}
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': labelId}}
              />
            </ListItemIcon>
            <ListItemText id={_id} primary={text} />
          </ListItem>
        );
      })}
    </List>
  );
}
