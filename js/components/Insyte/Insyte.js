import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import LectureList from '../LectureList/LectureList';
import styles from './Course.css';
import 'normalize.css';

class Insyte extends React.Component {
  render() {
    return (
      <div className={styles.insyte}>
      </div>
    );
  }
}

export default Relay.createContainer(Course, {
  fragments: {
    insyte: () => Relay.QL`
      fragment on Insyte {
          name
          description
      }
    `,
  },
});
