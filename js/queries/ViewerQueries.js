import React from 'react';
import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`
};
