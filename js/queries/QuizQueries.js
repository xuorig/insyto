import React from 'react';
import Relay from 'react-relay';

export default {
  quiz: () => Relay.QL`query { quiz(id: $id) }`
};
