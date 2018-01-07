import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { routes, onAuthChange } from './../imports/routes/routes';
import ReactDOM from 'react-dom';

import history from '../imports/routes/history';

import {} from './../imports/startup/simple-schema-configuration';

Tracker.autorun((c) => {
  const isAuthenticated = !!Meteor.userId();
  // console.log('isAuthenticated',isAuthenticated);
  onAuthChange(isAuthenticated);
});

Tracker.autorun((c) => {
  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
