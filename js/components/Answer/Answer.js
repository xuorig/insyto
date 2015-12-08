import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Answer.css';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerClass: styles.answer,
      checked: false
    }
    this._radio = {};
  }

  showScore(good) {
    if (!this.state.checked) {
      return
    }

    if (good) {
      this.setState({answerClass: styles.answer + " " + styles["answer--good"]});
    } else {
      this.setState({answerClass: styles.answer + " " + styles["answer--bad"]});
    }
  }

  handleChange(event) {
    this.setState({checked: event.target.checked});
  }

  render() {
    return (
        <div className={this.state.answerClass}>
         <input id={this.props.answer.id} name={this.props.questionId} type="radio" onChange={this.handleChange.bind(this)}/>
         <label for={this.props.answer.id} className={styles["answer__content"]}>{this.props.answer.content}</label>
        </div>
    );
  }
}

export default Relay.createContainer(Answer, {
  fragments: {
    answer: () => Relay.QL`
      fragment on Answer {
        content
      }
    `
  },
});
