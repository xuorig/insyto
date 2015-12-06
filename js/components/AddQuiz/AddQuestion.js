import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import Answer from './Answer';
import globalStyles from '../Shared/GlobalStyles.css';
import styles from './AddQuiz.css';


class AddQuestion extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        answers: []
      };
  }

  onAddAnswer(e) {
    e.preventDefault();
    this.setState((previousState, currentProps) => {
      return {answers: previousState.answers.concat({id: 1})};
    });
  }

  render() {
    let answers = this.state.answers.map(question => {
      return <Answer />;
    })
    return (
      <div className={styles.question}>
        <h3>Question 1</h3>
        <div className={'form-field-container'}>
          <input name="question[name]" type="text" placeholder="Question content" className='insyte-field' ref='title'/>
        </div>
        { answers }
        <div className={'form-field-container form-field-container--right-align'}>
          <a href="#" className={styles['add-answer-link']} onClick={this.onAddAnswer.bind(this)}>Add a choice</a>
        </div>
      </div>
    );
  }
}

export default AddQuestion;
