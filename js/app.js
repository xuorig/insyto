import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import { RelayRouter } from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes';

var token = localStorage.getItem('insyto_token');
var headers = token ? {Authorization: token} : {};

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/v1/queries', {
    headers: headers
  })
);

ReactDOM.render(
  <RelayRouter routes={routes} />,
  document.getElementById('root')
);
