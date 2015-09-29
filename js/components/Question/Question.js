import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Question.css';
import Answer from '../Answer/Answer';

class Question extends React.Component {
  render() {
    var question = this.props.question;
    console.log(question);
    return (
      <div className={styles.question}>
        {question.content}
        <div className={styles.answer_list}>
          {question.answers.edges.map(
            answer => <Answer key={answer.node.id} answer={answer.node}/>
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
