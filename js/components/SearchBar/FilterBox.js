import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import styles from './FilterBox.css';

var FILTER_BOX_STATES = {
  OPEN: 'open',
  CLOSED: 'closed',
}

class FilterBox extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {

  }

  onChange(event) {

  }

  render() {
    let filterBoxStyle = styles['filter-box'];
    if (this.props.filterBoxState === FILTER_BOX_STATES.CLOSED ) {
      filterBoxStyle = filterBoxStyle + ' ' + styles['filter-box--hidden']
    }
    return (
      <div className={filterBoxStyle}>Allo</div>
    );
  }
}

export default Relay.createContainer(FilterBox, {
  fragments: {},
});
