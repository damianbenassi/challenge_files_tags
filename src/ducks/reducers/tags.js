import { createReducer } from './createReducer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  tags: []
};

export const reducer = createReducer(initialState, {
  [actionTypes.REQUESTING_TAGS]: (state, action) => ({ ...state, loading: true, error: null }),
  [actionTypes.RECEIVED_TAGS]: (state, { payload }) => ({
    ...payload,
    loading: false
  })
});
