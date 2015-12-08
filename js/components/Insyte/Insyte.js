import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './Insyte.css';
import Button from '../Shared/Buttons/Button';
import Media from '../Media/Media'

class Insyte extends React.Component {
  render() {
    let content;
    if (this.props.insyte.userAllowedToSee) {
      content = (
        <div>
          <div className={styles.insyte__body__content}>
            <p>{this.props.insyte.description}</p>
            <Media media={this.props.insyte.media}/>
          </div>
          <Button href={`#/insyte/${this.props.insyte.rails_id}/quiz`} text='Answer quiz'/>
        </div>
      );
    } else {
      let prereqs = this.props.insyte.prereqs.map(
        (prereq) => <a href={`#/insyte/${prereq.rails_id}`}
                       className={styles['insyte__heading__title']}>
                      {prereq.title}
                    </a>
      )
      content = (
        <div className={styles.insyte__body__content}>
          <p>It appears you are missing some knowledge to view this Insyte.</p>
          <p>Check out these prerequisite insytes and come back to this later!</p>
          <div>
            {prereqs}
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className={styles.insyte}>
          <div className={styles.insyte__heading}>
            <div className={styles['insyte__heading__title']}>{this.props.insyte.title}</div>
            <div className={styles['insyte__heading__date']}>by {this.props.insyte.user.email}</div>
          </div>
          <div className={styles.insyte__body}>
            {content}
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
          userAllowedToSee
          prereqs {
            rails_id
            title
          }
      }
    `,
  },
});
