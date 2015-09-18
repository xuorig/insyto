import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Quiz.css';
import Button from '../Shared/Buttons/Button';

class Quiz extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.insyte}>
          <div className={styles.insyte__heading}>
            <div className={styles['insyte__heading__title']}>{this.props.insyte.title} - Quiz</div>
            <div className={styles['insyte__heading__date']}>September 28th 2015</div>
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
    insyte: () => Relay.QL`
      fragment on Insyte {
        title
      }
    `
  },
});
