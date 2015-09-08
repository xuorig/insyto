export default class extends Relay.Route {
  static queries = {
    course: () => Relay.QL`
      query Course {
        acourse
      }
    `,
  };
  static routeName = 'CourseRoute';
}
