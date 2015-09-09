import 'babel/polyfill';
import LectureList from '../LectureList/LectureList';
import styles from './Course.css';
import 'normalize.css';

class Course extends React.Component {
  render() {
    return (
      <div className={styles.course}>
        <h1>{this.props.course.name} - {this.props.course.description}</h1>
        <LectureList course={this.props.course}/>
      </div>
    );
  }
}

export default Relay.createContainer(Course, {
  fragments: {
    course: () => Relay.QL`
      fragment on Course {
        name,
        description,
        ${LectureList.getFragment('course')},
      }
    `,
  },
});
