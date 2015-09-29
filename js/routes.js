import React from 'react';
import {Route} from 'react-router';

import ViewerQueries from './queries/ViewerQueries';
import InsyteQueries from './queries/InsyteQueries';
import QuizQueries from './queries/QuizQueries';


import App from './components/App';
import InsyteList from './components/InsyteList/InsyteList';
import Insyte from './components/Insyte/Insyte';
import Quiz from './components/Quiz/Quiz';

export default (
  <Route
    component={App}
    queries={ViewerQueries}
  >
    <Route
      path="/" component={InsyteList}
      queries={ViewerQueries}
    />
    <Route
      path="/insyte/:id" component={Insyte}
      queries={InsyteQueries}
    />
    <Route
      path="/insyte/:id/quiz" component={Quiz}
      queries={QuizQueries}
    />
  </Route>
);
