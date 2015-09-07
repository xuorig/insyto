import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/queries')
);

React.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
