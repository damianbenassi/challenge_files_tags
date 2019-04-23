import { all, takeLatest, call, put } from 'redux-saga/effects';

import * as apiFiles from '../api/files';
import * as apiTags from '../api/tags';
import * as actionTypes from '../actions/actionTypes';
import * as actionsFiles from '../actions/files';
import * as actionsTags from '../actions/tags';

function* requestFiles({ payload: { page, tag } }) {
  try {
    const response = yield call(apiFiles.requestFiles, page, tag);
    yield put(actionsFiles.received(response.data));
  } catch (e) {
    yield put(actionsFiles.requestError(e));
  }
}

function* renameFile({ payload: { id, name, callback } }) {
  try {
    yield call(apiFiles.renameFile, id, name);
    yield put(actionsFiles.renamed(id, name));
    yield callback();
  } catch (e) {
    yield put(actionsFiles.renameError(e));
  }
}

function* requestTags() {
  try {
    const response = yield call(apiTags.requestTags);
    yield put(actionsTags.received({ tags: response.data }));
  } catch (e) {
    yield put(actionsTags.requestError(e));
  }
}

export default function* root() {
  yield all([
    yield takeLatest(actionTypes.REQUESTING_FILES, requestFiles),
    yield takeLatest(actionTypes.RENAMING_FILE, renameFile),

    yield takeLatest(actionTypes.REQUESTING_TAGS, requestTags)
  ]);
}
