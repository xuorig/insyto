import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './Video.css';

class Video extends React.Component {
  render() {
    return (
      <video id="video" className={styles.insyte__body__video__video}
        controls preload="auto" width="640" height="264"
        poster="http://video-js.zencoder.com/oceans-clip.png">
        <source src={this.props.url} type='video/ogg' />
      </video>
    );
  }
}

export default Relay.createContainer(Video, {
  fragments: {},
});
