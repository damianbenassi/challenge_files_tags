import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as routes from '../../constants/routes';
import './index.scss';

export const FileForm = ({ error, onSubmit, onChangeValue, value, page, tag }) => (
  <form onSubmit={onSubmit} style={{ margin: 80 }}>
    <FormControl error={!!error}>
      <TextField
        autoFocus
        id="filename"
        label="Filename"
        margin="normal"
        variant="outlined"
        helperText="Max 50 characters"
        InputLabelProps={{ shrink: true }}
        inputProps={{ maxlength: 50 }}
        value={value}
        onChange={onChangeValue}
      />
      {error && <FormHelperText id="error-text">{error}</FormHelperText>}
      <hr />
    </FormControl>
    <br />
    <Button variant="contained" color="secondary">
      <Link to={routes.FILTER.replace(':page', page).replace(':tag', tag || '')}>Back to file list</Link>
    </Button>
    <Button variant="contained" color="primary" onClick={onSubmit}>
      Save
    </Button>
  </form>
);

FileForm.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  current: PropTypes.number,
  path: PropTypes.string
};

export default FileForm;
