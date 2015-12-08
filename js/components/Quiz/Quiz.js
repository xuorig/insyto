import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Quiz.css';
import Button from '../Shared/Buttons/Button';
import Question from '../Question/Question';

import MarkAsDoneMutation from '../../mutations/MarkAsDoneMutation';

class Quiz extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        submitted: false,
        score: 0
      };
  }

  // Tell children through props that the questions have been submitted
  onSubmitAnswers(e) {
    e.preventDefault();
    let score = 0;
    for (let i = 0; i < this.props.insyte.quiz.questions.edges.length; i++) {
      const question_score = this.refs[`question-${i}`].refs.component.getScore();
      score += question_score
    }

    this.setState({
      submitted: true,
      score: score,
    })

    if (score / this.props.insyte.quiz.questions.edges.length > 0.5) {
      var onSuccess = (response) => {
        console.log(response);
      };
      var onFailure = (transaction) => {
        var error = transaction.getError() || new Error('Mutation failed.');
        console.error(error);
      };

      Relay.Store.update(new MarkAsDoneMutation({
        insyte_id: this.props.insyte.rails_id
      }), {onFailure, onSuccess});
    } else {
      console.log(score);
    }
  }

  render() {
    var questions = this.props.insyte.quiz.questions;
    var resultContent;
    if (this.state.submitted) {
      resultContent = <span>{this.state.score} / {questions.edges.length}</span>;
    } else {
      resultContent = <span>Submit your answers to get your score!</span>;
    }

    return (
      <div>
        <div className={styles.insyte}>
          <div className={styles.insyte__heading}>
            <div className={styles['insyte__heading__title']}>Quiz</div>
            <div className={styles['insyte__heading__date']}>September 28th 2015</div>
          </div>
          <div className={styles.question_list}>
            {questions.edges.map(
              (question, i) => <Question key={question.node.id}
                                    question={question.node}
                                    ref={`question-${i}`}/>
            )}
          </div>
          <div className={styles.quiz__result}>
            {resultContent}
          </div>
          <div className={styles.insyte__body}>
            <Button text='Submit answers' onClickFunc={(e) => this.onSubmitAnswers(e)}/>
          </div>
        </div>
        <div className={styles.insyte__footer}>
          <a href={`#/insyte/${this.props.insyte.rails_id}`} className={styles.insyte__footer__back}>Back to insyte</a>
          <a href="#" className={styles.insyte__footer__new}>Show me another insyte</a>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Quiz, {
  fragments: {
    insyte: () => Relay.QL`
      fragment on Insyte {
        rails_id
        quiz {
          questions(first: 5) {
            edges {
              node {
                id
                ${Question.getFragment('question')}
              }
            }
          }
        }
      }
    `
  },
});
