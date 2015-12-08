import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import Dropzone from 'react-dropzone';

import globalStyles from '../Shared/GlobalStyles.css';
import styles from './NewInsyte.css';
import Button from '../Shared/Buttons/Button';
import SubmitButton from '../Shared/Buttons/SubmitButton';
import AddInsyteMutation from '../../mutations/AddInsyteMutation';
import Spinner from '../Shared/Spinner/Spinner';

class AddInsyte extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        message: null,
        file: null,
        loading: false,
      };
  }

  onInsyteSubmit(e) {
    e.preventDefault();
    let title = this.refs.title.value;
    let description = this.refs.description.value;

    var onSuccess = (response) => {
      this.setState({loading: false});
      console.log(response);
      let insyte_id = response.addInsyte.newInsyteEdge.rails_id;
      window.location.href = `#/insyte/${insyte_id}/addquiz`;
    };
    var onFailure = (transaction) => {
      this.setState({loading: false});
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    this.setState({loading: true});

    Relay.Store.update(new AddInsyteMutation({
      title: title,
      description: description,
      type: 'video',
      file: this.state.file,
      url: 'hello',
      viewer: this.props.viewer
    }), {onFailure, onSuccess});
  }

  onDrop(files) {
    this.setState({file: files[0]});
    console.log(this.state.file);
  }

  render() {
    let button = this.state.loading ? <div><p>Uploading video, this might take a few minutes.</p><Spinner/></div> :
                 <SubmitButton onSubmitFunc={this.onInsyteSubmit.bind(this)}
                               text="Submit New Insyte"/>
    let dropzoneContent = this.state.file ? this.state.file.name :
      <div>Click or drop a file here to upload your media</div>

    return (
      <div>
      <div className={'insyto-container insyto-container--large-padding'}>
        <h2 className="insyto-heading">Create Insyte</h2>
        <form>
        <p className={'insyto-container__message'}>{this.state.message}</p>
        <div className={'form-field-container'}>
          <input name="title" type="text" placeholder="Insyte Title" className='insyte-field' ref='title'/>
        </div>
        <div className={'form-field-container'}>
          <input name="description" type="text" placeholder="Short Description" className='insyte-field' ref='description'/>
        </div>
        <div className={'form-field-container'}>
          <Dropzone onDrop={this.onDrop.bind(this)}
                    className={styles['dropzone']}
                    activeClassName={styles['dropzone--active']}>
            <div>{ dropzoneContent }</div>
          </Dropzone>
        </div>
        <div className={'form-field-container form-field-container--submit'}>
          { button }
        </div>
        </form>
      </div>
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
