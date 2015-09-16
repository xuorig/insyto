import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import InsyteList from './InsyteList/InsyteList';
import NavBar from './NavBar/NavBar'
import 'normalize.css';
import styles from './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <main className={styles.main}>
          <InsyteList viewer={this.props.viewer}/>
        </main>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${InsyteList.getFragment('viewer')}
      }
    `,
  },
});
