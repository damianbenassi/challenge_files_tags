import * as actionTypes from './actionTypes';

export const request = () => ({
  type: actionTypes.REQUESTING_TAGS
});
export const received = tags => ({
  type: actionTypes.RECEIVED_TAGS,
  payload: tags
});
export const requestError = e => ({
  type: actionTypes.REQUESTING_TAGS_ERROR,
  payload: e
});