import Relay from 'react-relay';
import ReactDOM from 'react-dom'

import { Router, Route, Link } from 'react-router'
import { RelayRouter } from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import ViewerQueries from './queries/ViewerQueries';
import InsyteQueries from './queries/InsyteQueries';
import QuizQueries from './queries/QuizQueries';

import App from './components/App';
import InsyteList from './components/InsyteList/InsyteList';
import Insyte from './components/Insyte/Insyte';
import NewInsyte from './components/NewInsyte/NewInsyte';
import Quiz from './components/Quiz/Quiz';
import LoginPage from './components/LoginPage/LoginPage';

var token = localStorage.getItem('insyto_token');
var headers = token ? {Authorization: token} : {}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/v1/queries', {
    headers: headers
  })
);

function prepareInsyteListParams(params, route) {
  console.log('hello');
  return {
    ...params,
    cat: params.cat ? parseInt(params.cat) : null,
  };
};

let history = createBrowserHistory()
ReactDOM.render(
  <RelayRouter history={history}>
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
  </RelayRouter>,
  document.getElementById('root')
);
