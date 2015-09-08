import 'babel/polyfill';
import LectureListItem from './LectureListItem';

class LectureList extends React.Component {
  render() {
    var lectures = this.props.course.lectures.edges;
    return (
      <ul>{lectures.map(lectureEdge => <LectureListItem lecture={lectureEdge.node}/>)}</ul>
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
