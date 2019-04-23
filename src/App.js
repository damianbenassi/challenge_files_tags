import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom';

import * as routes from './constants/routes';
import FileListPage from './pages/FileListPage';
import FileRenamePage from './pages/FileRenamePage';

const App = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={routes.HOME} exact component={FileListPage} />
        <Route path={routes.RENAME} exact component={FileRenamePage} />
        <Route path={routes.RENAME_TAG} exact component={FileRenamePage} />
        <Route path={routes.FILTER} exact component={FileListPage} />
        <Route path={routes.PAGE} exact component={FileListPage} />
      </Switch>
    </HashRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
