import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Question.css';
import Answer from '../Answer/Answer';

class Question extends React.Component {
  render() {
    var question = this.props.question;
    return (
      <div className={styles.question}>
        <div className={styles.question__title}>{question.content}</div>
        <div className={styles.answer_list}>
          {question.answers.edges.map(
            answer => <Answer key={answer.node.id}
                              answer={answer.node}
                              questionId={question.id}
                              submitted={this.props.submitted}
                              accepted={this.props.question.accepted_answer.__dataID__ === answer.node.id}
                              onGoodAnswerSelected={this.props.onGoodAnswerSelected} />
          )}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Question, {
  fragments: {
    question: () => Relay.QL`
      fragment on Question {
        id
        content
        accepted_answer
        answers(first: 4) {
          edges {
            node {
              id
              ${Answer.getFragment('answer')}
            }
          }
        }

      }
    `
  },
});
