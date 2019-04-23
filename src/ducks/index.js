import { combineReducers } from 'redux';
import * as files from './reducers/files';
import * as tags from './reducers/tags';

export default combineReducers({
  files: files.reducer,
  tags: tags.reducer
});
