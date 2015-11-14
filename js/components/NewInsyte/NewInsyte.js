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
    let title = this.refs.title.value;
    let description = this.refs.description.value;
    let url = this.refs.url.value;

    var onSuccess = (response) => {
      console.log(response);
      console.log('Mutation successful!');
      let insyte_id = response.addInsyte.newInsyteEdge.rails_id;
      window.location.href = `#/insyte/${insyte_id}`;
    };
    var onFailure = (transaction) => {
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    Relay.Store.update(new AddInsyteMutation({
      title: title,
      description: description,
      type: 'video',
      url: url,
      viewer: this.props.viewer
    }), {onFailure, onSuccess});
  }

  render() {
    return (
      <div className={'insyto-container insyto-container--large-padding'}>
        <form>
        <p className={'insyto-container__message'}>{this.state.message}</p>
        <div className={'form-field-container'}>
          <input name="title" type="text" placeholder="Insyte Title" className='insyte-field' ref='title'/>
        </div>
        <div className={'form-field-container'}>
          <input name="description" type="text" placeholder="Short Description" className='insyte-field' ref='description'/>
        </div>
        <div className={'form-field-container'}>
          <input name="url" type="text" placeholder="Media URL" className='insyte-field' ref='url'/>
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
      fragment on Viewer {
        currentUser
      }
    `,
  },
});
