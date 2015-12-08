import Relay from 'react-relay';

export default class MarkAsDoneMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {markAsDone}`;
  }

  getVariables() {
    return {
      insyte_id: this.props.insyte_id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on markAsDonePayload {
        insyte_id
      }
    `;
  }

  getConfigs() {
    return [{
    }];
    }
}
