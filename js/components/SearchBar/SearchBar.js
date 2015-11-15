import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './SearchBar.css';
import _ from 'underscore';
import FilterBox from './FilterBox'

var FILTER_BOX_STATES = {
  OPENED: 'open',
  CLOSED: 'closed',
}

class SearchBar extends React.Component {
  constructor() {
    super();
    this.handleOnChange = _.debounce(this.handleOnChange,1000);
    this.state = {
      query: null,
      filterBoxState: FILTER_BOX_STATES.CLOSED,
    }
  }

  componentWillMount() {
    this.handleSearchDebounced = _.debounce(function () {
        this.props.handleSearch(this.state.query);
    }, 500);
  }

  onChange(event) {
    this.setState({query: event.target.value});
    this.handleSearchDebounced();
  }

  onMoreFiltersClick(event) {
    event.preventDefault();
    if (this.state.filterBoxState === FILTER_BOX_STATES.CLOSED) {
      this.setState({filterBoxState: FILTER_BOX_STATES.OPENED});
    } else {
      this.setState({filterBoxState: FILTER_BOX_STATES.CLOSED});
    }
  }

  render() {
    return (
      <div>
      <div>
        <input type="text" className={styles['search-bar']}
                           placeholder="I want to learn about..."
                           onChange={this.onChange.bind(this)}/>
      </div>
      <FilterBox filterBoxState={this.state.filterBoxState}/>
      <div className={styles['add-insyte']}>
        <div>
          <a href="#/filters" className={styles['filter-insyte__link']} onClick={this.onMoreFiltersClick.bind(this)}>
            More filters
          </a>
        </div>
        <div><a href="#/new" className={styles['add-insyte__link']}>Add an insyte</a></div>
      </div>
      </div>
    );
  }
}

export default Relay.createContainer(SearchBar, {
  fragments: {},
});
