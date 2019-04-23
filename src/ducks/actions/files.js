import * as actionTypes from './actionTypes';

export const request = (page = 1, tag = null) => ({
  type: actionTypes.REQUESTING_FILES,
  payload: { page, tag }
});
export const received = files => ({
  type: actionTypes.RECEIVED_FILES,
  payload: files
});
export const requestError = e => ({
  type: actionTypes.REQUESTING_FILES_ERROR,
  payload: e
});

export const rename = (id, name, callback) => ({
  type: actionTypes.RENAMING_FILE,
  payload: { id, name, callback }
});
export const renamed = (id, name) => ({
  type: actionTypes.RENAMED_FILE,
  payload: { id, name }
});
export const renameError = e => ({
  type: actionTypes.RENAMING_FILE_ERROR,
  payload: e
});
