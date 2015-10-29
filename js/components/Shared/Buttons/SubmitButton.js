import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './SubmitButton.css';

class SubmitButton extends React.Component {
  render() {
    return (
      <div className={styles.button} href={this.props.href || '#'} onClick={this.props.onClickFunc}>
        {this.props.text}
      </div>
    );
  }
}

export default Relay.createContainer(SubmitButton, {
  fragments: {}
});
