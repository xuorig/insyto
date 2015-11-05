import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import globalStyles from '../Shared/GlobalStyles.css';
import styles from './NewInsyte.css';
import Button from '../Shared/Buttons/Button';
import SubmitButton from '../Shared/Buttons/SubmitButton';

class NewInsyte extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        message: null
      };
  }

  render() {
    return (
      <div className={'insyto-container insyto-container--large-padding'}>

      </div>
    );
  }
}

export default Relay.createContainer(NewInsyte, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
      }
    `,
  },
});
