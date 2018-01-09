import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { routes, onAuthChange2 } from './../imports/routes/routes';
import ReactDOM from 'react-dom';

import history from '../imports/routes/history';

import {} from './../imports/startup/simple-schema-configuration';

// VERSION 1 - for authentication validation
// Tracker.autorun((c) => {
//   const isAuthenticated = !!Meteor.userId();
//   // console.log('isAuthenticated',isAuthenticated);
//   const currentPagePrivacy = Session.get('currentPagePrivacy');
//   // console.log('currentPagePrivacy',currentPagePrivacy);
//   onAuthChange(isAuthenticated);
// });

// // VERSION 2 - for authentication validation
// Tracker.autorun((c) => {
//   const isAuthenticated = !!Meteor.userId();
//   const currentPagePrivacy = Session.get('currentPagePrivacy');
//   // console.log('isAuthenticated',isAuthenticated);
//   // console.log('currentPagePrivacy',currentPagePrivacy);
//   if (currentPagePrivacy==='unauth' && isAuthenticated) { // if on unauthenticated page and logged in, redirect to '/dashboard'
//     // console.log('redirect to Dashboard');
//     history.push('/dashboard');
//   } else if (currentPagePrivacy==='auth' && !isAuthenticated) { // if on authenticated page and not logged in, redirect to '/'
//     // console.log('redirect to login page');
//     history.push('/');
//   }
// });

// VERSION 2.1 - for authentication validation
Tracker.autorun((c) => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange2(isAuthenticated,currentPagePrivacy);
});

Tracker.autorun((c) => {
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen', false);
  
  if (selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`);
  }
});

Tracker.autorun(()=>{
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
});
