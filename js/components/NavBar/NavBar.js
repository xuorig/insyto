import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';
import styles from './NavBar.css';

class NavBar extends React.Component {
  render() {
    let userLink;
    if (this.props.viewer.currentUser) {
      userLink = <a href="#/login" className={styles['navbar__content__login__login-link']}>{this.props.viewer.currentUser.email}</a>
    } else {
      userLink = <a href="#/login" className={styles['navbar__content__login__login-link']}>Sign In</a>
    }

    return (
      <nav className={styles.navbar}>
        <div className={styles.navbar__content}>
          <div className={styles.navbar__content__left}></div>
          <div className={styles.navbar__content__brand}><a href="#"></a></div>
          <div className={styles.navbar__content__login}>
            { userLink }
          </div>
        </div>
      </nav>
    );
  }
}

export default Relay.createContainer(NavBar, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        currentUser {
          email
        }
      }
    `,
  }
});
