import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

import './FileRenamePage.scss';
import { request as requestFiles, rename as renameFile } from '../ducks/actions/files';
import * as routes from '../constants/routes';
import FileForm from '../components/FileForm';

const FileRenamePage = ({ files, match, history, requestFiles, renameFile }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!files.files.length) {
      requestFiles(match.params.page);
    }
  }, []);

  useEffect(() => {
    const file = files.files.find(file => file.id === match.params.file);
    if (file) {
      setName(file.name);
    }
  }, [files]);

  const handleChangeName = ({ target: { value } }) => setName(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      renameFile(match.params.file, name, () => {
        history.push(routes.FILTER.replace(':page', match.params.page).replace(':tag', match.params.tag || ''));
      });
    } else {
      setError('Please type a name');
    }
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Rename File
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {files.loading ? (
          <CircularProgress />
        ) : (
          <FileForm
            onSubmit={handleSubmit}
            onChangeValue={handleChangeName}
            value={name}
            error={error}
            page={match.params.page}
            tag={match.params.tag}
          />
        )}
      </main>
    </div>
  );
};

const mapStateToProps = ({ files }) => ({
  files
});

const mapDispatchToProps = dispatch => ({
  requestFiles: (page, tags) => dispatch(requestFiles(page, tags)),
  renameFile: (id, name, callback) => dispatch(renameFile(id, name, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FileRenamePage));