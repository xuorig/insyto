import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './Answer.css';

class Answer extends React.Component {
  render() {
    return (
        <div>
         <input id={this.props.answer.id} name="1" type="radio" value="1" />
         <label htmlFor={this.props.answer.id}><span>label 1</span></label>
         {this.props.answer.content}
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
