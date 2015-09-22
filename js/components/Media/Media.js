import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './Media.css';
import Video from '../Video/Video'

class Media extends React.Component {
  render() {
    return (
      <div>
        <Video url={this.props.media.url}/>
      </div>
    );
  }
}

export default Relay.createContainer(Media, {
  fragments: {
    media: () => Relay.QL`
      fragment on Media {
          ... on Video {
            url
          }
          ... on Audio {
            url
          }
          ... on Text {
            content
          }
      }
    `,
  },
});
