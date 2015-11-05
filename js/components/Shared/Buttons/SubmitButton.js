import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './SubmitButton.css';

class SubmitButton extends React.Component {
  render() {
    return (
      <button type="submit" className={styles.button} onClick={this.props.onSubmitFunc}>
        {this.props.text}
      </button>
    );
  }
}

export default Relay.createContainer(SubmitButton, {
  fragments: {}
});
