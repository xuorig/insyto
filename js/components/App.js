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
        <NavBar viewer={this.props.viewer}/>
        <main className={styles.main}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${NavBar.getFragment('viewer')}
        ${InsyteList.getFragment('viewer')}
      }
    `,
  },
});
