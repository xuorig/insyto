import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './InsyteListItem.css';

class InsyteListItem extends React.Component {
  render() {
    return (
      <div className={styles.lecture}>
        <div className={styles.lecture__heading}>
          <div className={styles['lecture__heading--name']}><a href="#">{this.props.insyte.title} - {this.props.insyte.description}</a></div>
          <div className={styles['lecture__heading--date']}>September 28th 2015</div>
        </div>
        <div className={styles.lecture__body}>
          <p>Senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.</p>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(InsyteListItem, {
  fragments: {}
});
