import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Quiz.css';
import Button from '../Shared/Buttons/Button';
import Question from '../Question/Question';

class Quiz extends React.Component {
  render() {
    var questions = this.props.quiz.questions;
    console.log(questions);
    return (
      <div>
        <div className={styles.insyte}>
          <div className={styles.insyte__heading}>
            <div className={styles['insyte__heading__title']}>Quiz</div>
            <div className={styles['insyte__heading__date']}>September 28th 2015</div>
          </div>
          <div className={styles.question_list}>
            {questions.edges.map(
              question => <Question key={question.node.id} question={question.node}/>
            )}
          </div>
          <div className={styles.insyte__body}>
            <Button href="#/insyte/1/quiz" text='Submit answers'/>
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
