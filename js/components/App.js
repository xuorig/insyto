import Relay from 'react-relay';
import 'babel/polyfill';
import InsyteList from './InsyteList/InsyteList';
import Insyte from './Insyte/Insyte';

import NavBar from './NavBar/NavBar'
import 'normalize.css';
import styles from './App.css';
import ReactDOM from 'react-dom';

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
      }
    `,
  },
});
