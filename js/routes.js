import React from 'react';
import { IndexRoute, Route } from 'react-router';

import ViewerQueries from './queries/ViewerQueries';
import InsyteQueries from './queries/InsyteQueries';
import QuizQueries from './queries/QuizQueries';

import App from './components/App';
import InsyteList from './components/InsyteList/InsyteList';
import Insyte from './components/Insyte/Insyte';
import NewInsyte from './components/NewInsyte/NewInsyte';
import AddQuiz from './components/AddQuiz/AddQuiz';

import Quiz from './components/Quiz/Quiz';
import LoginPage from './components/LoginPage/LoginPage';

function prepareInsyteListParams(params, route) {
  console.log(params);
  return {
    ...params,
    cat: params.cat ? parseInt(params.cat) : null,
  };
};


export default (
  <Route
    path="/"
    component={App}
    queries={ViewerQueries}
  >
    <IndexRoute
      component={InsyteList}
      queries={ViewerQueries}
      queryParams={['cat']}
      prepareParams={prepareInsyteListParams}
    />
    <Route
      path="/login" component={LoginPage}
    />
    <Route
      path="/insyte/:id" component={Insyte}
      queries={InsyteQueries}
    />
    <Route
      path="/insyte/:id/addquiz" component={AddQuiz}
      queries={InsyteQueries}
    />
     <Route
      path="/new" component={NewInsyte}
      queries={ViewerQueries}
    />
    <Route
      path="/insyte/:id/quiz" component={Quiz}
      queries={InsyteQueries}
    />
  </Route>
)
