import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './Spinner.css';

class InsyteListItem extends React.Component {
  render() {
    return (
      <div className={styles.spinner}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
    );
  }
}

export default Relay.createContainer(InsyteListItem, {
  fragments: {}
});
