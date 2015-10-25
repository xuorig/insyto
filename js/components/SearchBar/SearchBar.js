import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './SearchBar.css';
import _ from 'underscore';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.handleOnChange = _.debounce(this.handleOnChange,1000);
    this.state = {
      query: null
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

  render() {
    return (
      <div>
        <input type="text" className={styles['search-bar']}
                           placeholder="I want to learn about..."
                           onChange={this.onChange.bind(this)}/>
      </div>
    );
  }
}

export default Relay.createContainer(SearchBar, {
  fragments: {},
});
