import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  ListItemText,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import categories from './fakeCategories';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const CategoriesList = ({ classes: { root, title } }) => (
  <List
    component="div"
    className={root}
    subheader={
      <ListSubheader component="div">
        <Typography color="primary" variant="h6" className={title}>
          Categories
        </Typography>
      </ListSubheader>
    }
  >
    {categories.map(({ name, children }) => (
      <ListItem button>
          <ExpandLess />
        <ListItemText inset primary={name} />
      </ListItem>
    ))}
  </List>
);

export default withStyles(styles)(CategoriesList);
