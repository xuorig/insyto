import 'babel/polyfill';
import Course from './Course/Course';
import NavBar from './NavBar/NavBar'
import 'normalize.css';
import styles from './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <main className={styles.main}>
          <Course course={this.props.course}/>
        </main>
      </div>
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
