import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import AddQuestion from './AddQuestion';
import globalStyles from '../Shared/GlobalStyles.css';
import styles from './AddQuiz.css';
import Button from '../Shared/Buttons/Button';
import SubmitButton from '../Shared/Buttons/SubmitButton';
import Spinner from '../Shared/Spinner/Spinner';
import AddQuizMutation from '../../mutations/AddQuizMutation';

class AddQuiz extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        message: null,
        loading: false,
        questions: [],
      };
  }

  onQuizSubmit(e) {
    e.preventDefault();
    let title = this.refs.title.value;
    let description = this.refs.description.value;

    var onSuccess = (response) => {
      this.setState({loading: false});
      console.log(response);
      let insyte_id = response.addInsyte.newInsyteEdge.rails_id;
      window.location.href = `#/insyte/${insyte_id}`;
    };
    var onFailure = (transaction) => {
      this.setState({loading: false});
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    this.setState({loading: true});

    Relay.Store.update(new AddQuizMutation({
      viewer: this.props.viewer
    }), {onFailure, onSuccess});
  }

  onAddQuestion(e) {
    e.preventDefault();
    this.setState((previousState, currentProps) => {
      return {questions: previousState.questions.concat({id: 1})};
    });
  }

  render() {
    let button = this.state.loading ? <div><Spinner/></div> :
                 <SubmitButton onSubmitFunc={alert}
                               text="Submit Quiz"/>
    let questions = this.state.questions.map(question => {
      return <AddQuestion />;
    });
    return (
      <div>
        <div className={'insyto-container insyto-container--large-padding'}>
          <h2 className="insyto-heading">Create Quiz for Insyte</h2>
          <form>
            { questions }
            <div className={styles['add-new-question']}>
              <a href="#" className={styles['add-new -question--link']} onClick={this.onAddQuestion.bind(this)}>Add a new question</a>
            </div>
            <div className={'form-field-container'}>
              <SubmitButton onSubmitFunc={this.onQuizSubmit.bind(this)}
                          text="Save Quiz"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(AddQuiz, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        currentUser
      }
    `,
  },
});
