import React from 'react';
import Relay from 'react-relay';

export default {
  insyte: () => Relay.QL`query { insyte(id: $id) }`
};
