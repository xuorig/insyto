import React from 'react';
import Relay from 'react-relay';

import {Router} from 'react-router';
import {history} from 'react-router/lib/HashHistory';
import ReactRouterRelay from 'react-router-relay';
import routes from './routes';

var token = localStorage.getItem('insyto_token');
console.log(token);

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/v1/queries', {
    headers: {
      Authorization: token
    }
  })
);

React.render(
  <Router
    createElement={ReactRouterRelay.createElement}
    history={history} routes={routes}
  />,
  document.getElementById('root')
);
