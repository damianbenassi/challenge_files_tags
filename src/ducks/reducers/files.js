import { createReducer } from './createReducer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  tag: null,
  page: null,
  total_files: null,
  files: []
};

export const reducer = createReducer(initialState, {
  [actionTypes.REQUESTING_FILES]: (state, { payload: { page, tag } }) => ({ ...state, loading: true, erro: null, page, tag }),
  [actionTypes.RECEIVED_FILES]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false
  }),
  [actionTypes.RENAMED_FILE]: (state, { payload }) => ({
    ...state,
    [payload.date]: {
      ...initialState,
      files: initialState.files.map(file => file.id !== payload.id ? file : payload)
    }
  })
});
