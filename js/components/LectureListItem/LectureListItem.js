import 'babel/polyfill';
import styles from './LectureListItem.css';

class LectureListItem extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.lecture.name}</p>
        <p>{this.props.lecture.description}</p>
      </div>
    );
  }
}

export default Relay.createContainer(LectureListItem, {
  fragments: {}
});
