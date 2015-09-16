import React from 'react';
import {Route} from 'react-router';

import ViewerQueries from './queries/ViewerQueries';

import App from './components/App';

export default (
  <Route
    component={App}
    queries={ViewerQueries}
  >
    <Route
      path="/" component={App}
      queries={ViewerQueries}
    />
    <Route
      path="/lecture/:id" component={App}
      queries={ViewerQueries}
    />
  </Route>
);
