import App from './components/App';
import Course from './components/Course';
import AppHomeRoute from './routes/AppHomeRoute';
import CourseRoute from './routes/CourseRoute';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/queries')
);

React.render(
  <Relay.RootContainer
    Component={Course}
    route={new CourseRoute()}
  />,
  document.getElementById('root')
);
