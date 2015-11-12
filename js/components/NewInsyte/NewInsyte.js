import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import globalStyles from '../Shared/GlobalStyles.css';
import styles from './NewInsyte.css';
import Button from '../Shared/Buttons/Button';
import SubmitButton from '../Shared/Buttons/SubmitButton';
import AddInsyteMutation from '../../mutations/AddInsyteMutation';

class AddInsyte extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        message: null
      };
  }

  onInsyteSubmit(e) {
    e.preventDefault();
    Relay.Store.update(new AddInsyteMutation({
      title: 'Some New Insyte',
      description: 'Description of the insyte',
      type: 'video',
      url: 'http://google.com',
      viewer: this.props.viewer
    }));
  }

  render() {
    return (
      <div className={'insyto-container insyto-container--large-padding'}>
        <form>
        <p className={'insyto-container__message'}>{this.state.message}</p>
        <div className={'form-field-container'}>
          <input name="title" type="text" placeholder="Insyte Title" className={styles.signinform} ref='email'/>
        </div>
        <div className={'form-field-container'}>
          <input name="description" type="text" placeholder="Short Description" className={styles.signinform} ref='pass'/>
        </div>
        <div className={'form-field-container'}>
          <input name="url" type="text" placeholder="Media URL" className={styles.signinform} ref='url'/>
        </div>
        <div className={'form-field-container form-field-container--submit'}>
          <SubmitButton onSubmitFunc={this.onInsyteSubmit.bind(this)} text="Submit New Insyte"/>
        </div>
        </form>
      </div>
    );
  }
}

export default Relay.createContainer(AddInsyte, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
          id
      }
    `,
  },
});
