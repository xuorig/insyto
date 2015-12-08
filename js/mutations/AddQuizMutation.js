import Relay from 'react-relay';

export default class AddQuizMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addQuiz}`;
  }

  getVariables() {
    return {
      insyte_id: this.props.insyte.rails_id,
      questions: this.props.questions,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddQuizPayload {
        insyte_id
      }
    `;
  }
  getConfigs() {
    return [{
    }];
    }
}
