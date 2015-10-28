import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import styles from './LoginPage.css';
import Button from '../Shared/Buttons/Button';

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        LOGIN
      </div>
    );
  }
}

export default Relay.createContainer(LoginPage, {
  fragments: {},
});
