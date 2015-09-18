import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import InsyteListItem from '../InsyteListItem/InsyteListItem';
import Spinner from '../Shared/Spinner/Spinner';
import Button from '../Shared/Buttons/Button';
import styles from './InsyteList.css';

class InsyteList extends React.Component {
  state = { loading: false };

  loadMore(e) {
    e.preventDefault();
    var count = this.props.relay.variables.count;
    this.setState({loading: true});
    this.props.relay.setVariables({
      count: count + 3
    }, (readyState) => {
      if (readyState.done) {
        this.setState({loading: false});
        window.scrollTo(0,document.body.scrollHeight);
      }
    });
  }

  render() {
    var loadMore;
    if (this.state.loading) {
      loadMore = <Spinner/>
    } else {
      loadMore = <Button text='load more' onClickFunc={(e) => this.loadMore(e)}/>
    }

    var insytes = this.props.viewer.insytes;
    return (
      <div>
        <div className={styles.lecture_list}>{insytes.edges.map(insyte => <InsyteListItem key={insyte.node.rails_id} insyte={insyte.node}/>)}</div>
        {loadMore}
      </div>
    );
  }
}

export default Relay.createContainer(InsyteList, {
  initialVariables: {
    count: 3
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        insytes(first: $count) {
          edges {
            node {
              ${InsyteListItem.getFragment('insyte')}
            }
          }
        }
      }
    `,
  },
});
