import 'babel/polyfill';

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div>{this.props.course.name} - {this.props.course.description}</div>
        <ul>
        {this.props.course.lectures.edges.map(edge =>
          <li>{edge.node.name} ({edge.node.description})</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    course: () => Relay.QL`
      fragment on Course {
        name
        description
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
