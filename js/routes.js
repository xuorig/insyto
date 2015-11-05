import React from 'react';
import {Route} from 'react-router';

import ViewerQueries from './queries/ViewerQueries';
import InsyteQueries from './queries/InsyteQueries';
import QuizQueries from './queries/QuizQueries';


import App from './components/App';
import InsyteList from './components/InsyteList/InsyteList';
import Insyte from './components/Insyte/Insyte';
import NewInsyte from './components/NewInsyte/NewInsyte';
import Quiz from './components/Quiz/Quiz';
import LoginPage from './components/LoginPage/LoginPage';

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
      path="/login" component={LoginPage}
    />
    <Route
      path="/insyte/:id" component={Insyte}
      queries={InsyteQueries}
    />
    <Route
      path="/new" component={NewInsyte}
      queries={ViewerQueries}
    />
    <Route
      path="/insyte/:id/quiz" component={Quiz}
      queries={QuizQueries}
    />
  </Route>
);
