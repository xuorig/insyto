import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Question.css';

class Question extends React.Component {
  render() {
    return (
      <div className={styles.question}>
        <div className={styles.question}>
          Whats the biggest animal on earth ?
        </div>
        <AnswerList/>
      </div>
    );
  }
}

export default Relay.createContainer(Question, {
  fragments: {
    insyte: () => Relay.QL`
      fragment on Insyte {
        title
      }
    `
  },
});
