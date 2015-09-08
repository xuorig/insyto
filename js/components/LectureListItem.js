import 'babel/polyfill';

class LectureListItem extends React.Component {
  render() {
    return (
      <li>
        <div>{this.props.lecture.name}</div>
        <div>{this.props.lecture.description}</div>
      </li>
    );
  }
}

export default Relay.createContainer(LectureListItem, {
  fragments: {}
});
