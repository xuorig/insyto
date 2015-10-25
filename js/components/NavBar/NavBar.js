import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbar__content}>
          <a href="#"><div className={styles.navbar__content__brand}></div></a>
        </div>
      </nav>
    );
  }
}

export default Relay.createContainer(NavBar, {
  fragments: {}
});
