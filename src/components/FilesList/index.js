import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';

import * as routes from '../../constants/routes';
import './index.scss';
import Pagination from '../Pagination';

export const FileList = ({ files }) => (
  <div>
    <List>
      {files.files.map((file, index) => (
        <Link key={file.id} to={routes.RENAME_TAG.replace(':page', files.page).replace(':file', file.id).replace(':tag', files.tag || '')}>
          <ListItem button>
            <FileCopyOutlined />
            <ListItemText primary={file.name} />
          </ListItem>
        </Link>
      ))}
    </List>
    {files.total_files > 10 && (
      <Pagination
        totalItems={files.total_files}
        itemsPerPage={10}
        current={parseInt(files.page)}
        path={routes.FILTER.replace(':tag', files.tag || '')}
      />
    )}
  </div>
);

FileList.propTypes = {
  files: PropTypes.shape({
    files: PropTypes.array,
    total_files: PropTypes.number,
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

export default FileList;
