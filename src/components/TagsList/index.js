import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';

import * as routes from '../../constants/routes';
import './index.scss';

export const TagsList = ({ tags }) => (
  <List>
    {tags.tags.map(({ tag, files }, index) => (
      <Link key={tag} to={routes.FILTER.replace(':page', 1).replace(':tag', tag)}>
        <ListItem button>
          <BookmarkBorder />
          <ListItemText primary={`${tag} (${files})`} />
        </ListItem>
      </Link>
    ))}
  </List>
);

TagsList.propTypes = {
  tags: PropTypes.shape({
    tags: PropTypes.array
  })
};

export default TagsList;
