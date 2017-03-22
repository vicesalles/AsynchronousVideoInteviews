'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('question service', function() {
  it('registered the questions service', () => {
    assert.ok(app.service('questions'));
  });
});
