import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './Button.css';

class Button extends React.Component {
  render() {
    return (
      <a href={this.props.href || '#'}>
        <div className={styles.button} onClick={this.props.onClickFunc}>{this.props.text}</div>
      </a>
    );
  }
}

export default Relay.createContainer(Button, {
  fragments: {}
});
