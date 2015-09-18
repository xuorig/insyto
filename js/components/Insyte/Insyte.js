import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './Insyte.css';
import Button from '../Shared/Buttons/Button';

class Insyte extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.insyte}>
          <div className={styles.insyte__heading}>
            <div className={styles['insyte__heading__title']}>{this.props.insyte.title} - {this.props.insyte.description}</div>
            <div className={styles['insyte__heading__date']}>September 28th 2015</div>
          </div>
          <div className={styles.insyte__body}>
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.</p>
            <div className={styles.insyte__body__video}>
              <video id="example_video_1" className={styles.insyte__body__video__video}
                controls preload="auto" width="640" height="264"
                poster="http://video-js.zencoder.com/oceans-clip.png">
                <source src="http://video-js.zencoder.com/oceans-clip.ogv" type='video/ogg' />
              </video>
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
      }
    `,
  },
});
