#!/usr/bin/env babel-node --optional es7.asyncFunctions

import fs from 'fs';
import path from 'path';
import { introspectionQuery, printSchema } from 'graphql/utilities';
var fetch = require('node-fetch');
// Save JSON of full schema introspection for Babel Relay Plugin to use

fetch('http://localhost:3000/queries', {
  method: 'post',
  body: `query=${introspectionQuery}`
})
.then(function(response) {
  return response.json()
}).then(function(result) {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../data/schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
})
