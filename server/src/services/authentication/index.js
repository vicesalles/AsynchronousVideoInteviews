'use strict';

const authentication = require('feathers-authentication');

const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const LinkedinTokenStrategy = require('passport-linkedin-token-oauth2').Strategy;

module.exports = function() {
  const app = this;

  let config = app.get('auth');
  
  config.linkedin.strategy = LinkedinStrategy;
  config.linkedin.tokenStrategy = LinkedinTokenStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
};
