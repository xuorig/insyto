import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Quiz.css';
import Button from '../Shared/Buttons/Button';
import Question from '../Question/Question';

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
    console.log("Answers submitted");
    this.setState({submitted: true});
  }

  // When submitted, the question returns its result (0 or 1)
  // Add it to the answer scores array
  onGoodAnswerSelected() {
    console.log("good!");
    this.setState((previousState, currentProps) => {
      return {score: previousState.score + 1};
    });
    console.log(this.state.score);
  }

  render() {
    var questions = this.props.quiz.questions;
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
              question => <Question key={question.node.id}
                                    question={question.node}
                                    submitted={this.state.submitted}
                                    onGoodAnswerSelected={this.onGoodAnswerSelected.bind(this, 1)}/>
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
          <a href="#/insyte/1" className={styles.insyte__footer__back}>Back to insyte</a>
          <a href="#" className={styles.insyte__footer__new}>Show me another insyte</a>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Quiz, {
  fragments: {
    quiz: () => Relay.QL`
      fragment on Quiz {
        questions(first: 5) {
          edges {
            node {
              id
              ${Question.getFragment('question')}
            }
          }
        }
      }
    `
  },
});
