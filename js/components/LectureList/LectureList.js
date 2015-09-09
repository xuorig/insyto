import 'babel/polyfill';
import LectureListItem from '../LectureListItem/LectureListItem';
import styles from './LectureList.css';

class LectureList extends React.Component {
  render() {
    var lectures = this.props.course.lectures.edges;
    return (
      <div className={styles.lecture_list}>{lectures.map(lectureEdge => <LectureListItem lecture={lectureEdge.node}/>)}</div>
    );
  }
}

export default Relay.createContainer(LectureList, {
  fragments: {
    course: () => Relay.QL`
      fragment on Course {
        lectures(first: 10) {
          edges {
            node {
              name
              description
            }
          }
        }
      }
    `,
  },
});
