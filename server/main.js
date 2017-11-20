import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import { validateNewUser, validateLoginAttempt } from './../imports/api/users';
// import {} from './../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  // code to run on server at startup
  // Start listening to create new user event
  validateNewUser();
  // Start listening to login attempt event
  validateLoginAttempt();
});
