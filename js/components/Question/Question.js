import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Question.css';
import Answer from '../Answer/Answer';

class Question extends React.Component {
  getScore() {
    let score = 0;
    for (let i = 0; i < this.props.question.answers.edges.length; i++) {
      let answer_component = this.refs[`answer-${i}`].refs.component;
      if (`answer-${i}` === this.accepted_ref && answer_component.state.checked) {
        score = 1;
        answer_component.showScore(true);
      } else {
        answer_component.showScore(false)
      }
    }
    return score;
  }

  render() {
    var question = this.props.question;
    return (
      <div className={styles.question}>
        <div className={styles.question__title}>{question.content}</div>
        <div className={styles.answer_list}>
          {question.answers.edges.map(
            (answer, i) => {
              if (this.props.question.accepted_answer.__dataID__ === answer.node.id) {
                this.accepted_ref = `answer-${i}`;
              }
              return <Answer key={answer.node.id}
                      ref={`answer-${i}`}
                      answer={answer.node}
                      questionId={question.id} />
            }
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
