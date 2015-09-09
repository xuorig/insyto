import 'babel/polyfill';
import Course from './Course/Course';
import 'normalize.css';
import styles from './App.css';

class App extends React.Component {
  render() {
    return (
      <Course course={this.props.course}/>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    course: () => Relay.QL`
      fragment on Course {
        ${Course.getFragment('course')}
      }
    `,
  },
});
