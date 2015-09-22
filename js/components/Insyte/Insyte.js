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
            <div className={styles['insyte__heading__date']}>September 28th 2015</div>
          </div>
          <div className={styles.insyte__body}>
            <div className={styles.insyte__body__content}>
              <p>{this.props.insyte.description}</p>
              <Media media={this.props.insyte.media}/>
            </div>
            <Button href="#/insyte/1/quiz" text='answer quiz'/>
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
          title
          description
          media {
            ${Media.getFragment('media')}
          }
      }
    `,
  },
});
