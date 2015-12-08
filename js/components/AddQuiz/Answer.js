import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import globalStyles from '../Shared/GlobalStyles.css';
import styles from './AddQuiz.css';


class Answer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  onAddAnswer(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className={'form-field-container'}>
        <input name="answer[]" type="text" placeholder="Answer Choice" className='insyte-field' ref='content'/>
      </div>
    );
  }
}

export default Answer;
