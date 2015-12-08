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
        current_question_id: 0,
      };
  }

  getQuestionsData() {
    let questionsData = []
    for (var i = 0; i < this.state.current_question_id; i++) {
     let question_component = this.refs['question-' + i];
     questionsData.push(question_component.getQuestionData());
   }
   return questionsData;
  }

  onQuizSubmit(e) {
    e.preventDefault();

    var onSuccess = (response) => {
      this.setState({loading: false});
      console.log(response);
    };
    var onFailure = (transaction) => {
      this.setState({loading: false});
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    this.setState({loading: true});

    Relay.Store.update(new AddQuizMutation({
      questions: this.getQuestionsData(),
      insyte: this.props.insyte,
    }), {onFailure, onSuccess});
  }

  onAddQuestion(e) {
    e.preventDefault();
    this.setState((previousState, currentProps) => {
      return {
        questions: previousState.questions.concat({
          id: previousState.current_question_id
        }),
        current_question_id: previousState.current_question_id + 1,
      };
    });
  }

  render() {
    let button = this.state.loading ? <div><Spinner/></div> :
                 <SubmitButton onSubmitFunc={alert}
                               text="Submit Quiz"/>
    let questions = this.state.questions.map((question, i) => {
      return <AddQuestion key={i} question={question} ref={`question-${i}`}/>;
    });
    return (
      <div>
        <div className={'insyto-container insyto-container--large-padding'}>
          <h2 className="insyto-heading">Create Quiz for Insyte</h2>
          <form>
            { questions }
            <div className={styles['add-new-question']}>
              <Button text='Add Question' onClickFunc={this.onAddQuestion.bind(this)}/>
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
    insyte: () => Relay.QL`
      fragment on Insyte {
        rails_id
        id
      }
    `,
  },
});
