import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TodoList() {
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
                checked={checked.indexOf(_id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': labelId}}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={text} />
          </ListItem>
        );
      })}
    </List>
  );
}
