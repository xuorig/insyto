import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbar__content}>
          <div className={styles.navbar__content__left}></div>
          <div className={styles.navbar__content__brand}><a href="#"></a></div>
          <div className={styles.navbar__content__login}>
            <a href="#/login" className={styles['navbar__content__login__login-link']}>Sign In</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Relay.createContainer(NavBar, {
  fragments: {}
});
