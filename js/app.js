import React from 'react';
import Relay from 'react-relay';

import {Router} from 'react-router';
import {history} from 'react-router/lib/HashHistory';
import ReactRouterRelay from 'react-router-relay';
import routes from './routes';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/queries')
);

React.render(
  <Router
    createElement={ReactRouterRelay.createElement}
    history={history} routes={routes}
  />,
  document.getElementById('root')
);
