import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './Insyte.css';
import Button from '../Shared/Buttons/Button';
import Media from '../Media/Media'

class Insyte extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.insyte}>
          <div className={styles.insyte__heading}>
            <div className={styles['insyte__heading__title']}>{this.props.insyte.title}</div>
            <div className={styles['insyte__heading__date']}>by {this.props.insyte.user.email}</div>
          </div>
          <div className={styles.insyte__body}>
            <div className={styles.insyte__body__content}>
              <p>{this.props.insyte.description}</p>
              <Media media={this.props.insyte.media}/>
            </div>
            <Button href={`#/insyte/${this.props.insyte.rails_id}/quiz`} text='Answer quiz'/>
          </div>

        </div>
        <div className={styles.insyte__footer}>
          <a href="#" className={styles.insyte__footer__back}>Back to search</a>
          <a href="#" className={styles.insyte__footer__new}>Show me something similar</a>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Insyte, {
  fragments: {
    insyte: () => Relay.QL`
      fragment on Insyte {
          rails_id
          title
          description
          media {
            ${Media.getFragment('media')}
          }
          user {
            email
          }
      }
    `,
  },
});
