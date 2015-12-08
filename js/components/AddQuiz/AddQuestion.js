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

  getQuestionData() {
    let questionData = {};
    questionData.content = this.refs.content.value;
    questionData.answers = [];
    questionData.accepted_answer = this.refs['answer-0'].refs.content.value
    for (let i = 0; i < this.state.answers.length; i++) {
     let answer_component = this.refs['answer-' + i];
     questionData.answers.push({
       content: answer_component.refs.content.value,
     });
   }
   return questionData;
  }

  onAddAnswer(e) {
    e.preventDefault();
    this.setState((previousState, currentProps) => {
      return {answers: previousState.answers.concat({id: 1})};
    });
  }

  render() {
    let answers = this.state.answers.map((question, i) => {
      return <Answer key={i} ref={`answer-${i}`}/>;
    })
    return (
      <div className={styles.question}>
        <h3>Question {this.props.question.id}</h3>
        <div className={'form-field-container'}>
          <input name="question[name]" type="text" placeholder="Question content" className='insyte-field' ref='content'/>
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
