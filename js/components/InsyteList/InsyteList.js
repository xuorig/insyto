import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';
import InsyteListItem from '../InsyteListItem/InsyteListItem';
import Spinner from '../Shared/Spinner/Spinner';
import Button from '../Shared/Buttons/Button';
import SearchBar from '../SearchBar/SearchBar';
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

  onSearch(title) {
    this.setState({searching: true});
    //Weird bug with empty string arguments in graphql-ruby
    // if (title == '') {
    //   title = null
    // }
    this.props.relay.setVariables({
      title: title
    }, (readyState) => {
      if (readyState.done) {
        this.setState({searching: false});
      }
    });
  }

  render() {
    var insytes = this.props.viewer.insytes;
    var hasNextPage = this.props.viewer.insytes.pageInfo.hasNextPage;
    var loadMore;
    if (this.state.loading) {
      loadMore = <Spinner/>
    } else {
      loadMore = hasNextPage ? <Button text='load more' onClickFunc={(e) => this.loadMore(e)}/>
                             : <p className={styles['query-info']}>End of results</p>
    }
    var content;

    if (this.state.searching) {
      content = <Spinner />
    } else {
      content = insytes.edges.length ? <div className={styles.lecture_list}>{insytes.edges.map(
        insyte => <InsyteListItem key={insyte.node.rails_id} insyte={insyte.node}/>
      )}</div> : <p className={styles['query-info']}>No results found, please try again with another query.</p>
    }

    return (
      <div>
        <SearchBar handleSearch={this.onSearch.bind(this)}/>
        {content}
        {loadMore}
      </div>
    );
  }
}

export default Relay.createContainer(InsyteList, {
  initialVariables: {
    count: 3,
    title: null,
    cat: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        insytes(first: $count, title: $title, cat: $cat) {
          edges {
            node {
              ${InsyteListItem.getFragment('insyte')}
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  },
});
