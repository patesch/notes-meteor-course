import React from 'react';
// import { Switch, Router, Route, Redirect } from 'react-router'; // customize by Pedro to adjust to the version Meteor 1.6
import { BrowserRouter, Router, Switch, Route, Redirect } from 'react-router-dom';

// import browserHistory from './history';
// OR (a wrapped browserHistory)
import history from './history';

// route components
import Login from './../ui/Login.js'; // Signin
import Dashboard from './../ui/Dashboard.js';
import Signup from './../ui/Signup.js';
import NotFound from './../ui/NotFound.js';

const publicPages = ['/','/signup'];
const privatePages = ['/dashboard'];
let isAuthenticated = false;

// VERSION 1 - for authentication validation
// export const onAuthChange = (isAuth) => {
//   isAuthenticated = isAuth;
//
//   const pathname = history.location.pathname;
//   const routes = pathname.split('/');
//   const route = routes.length>1 ? '/'+routes[1] : '/';
//
//   const isPublicPage = publicPages.includes(route);
//   const isPrivatePage = privatePages.includes(route);
//
//   // console.log('pathname', pathname);
//   // console.log('route', route);
//   // console.log('privatePages', privatePages);
//   //
//   // console.log('isPublicPage:',isPublicPage);
//   // console.log('isPrivatePage',isPrivatePage);
//   // console.log('isAuth:',isAuth);
//
//   if (isPublicPage && isAuth) { // if on unauthenticated page and logged in, redirect to '/dashboard'
//     // console.log('redirect to Dashboard');
//     history.push('/dashboard');
//   } else if (isPrivatePage && !isAuth) { // if on authenticated page and not logged in, redirect to '/'
//     // console.log('redirect to login page');
//     history.push('/');
//   }
// };

// //////////////////////////////////////////////
// VERSION 2 - for authentication validation
// pattern: browserHistory.listenBefore( (location, action) => doSomething(location).then(action) );
// Adicionada o listen do history
history.listen( (location, action) => {
  const pathname = location.pathname;
  const routes = pathname.split('/');
  const route = routes.length>1 ? '/'+routes[1] : '/';

  const isPublicPage = publicPages.includes(route);
  const isPrivatePage = privatePages.includes(route);

  const currentPagePrivacy = isPrivatePage ? 'auth' : 'unauth';
  Session.set('currentPagePrivacy',currentPagePrivacy);
} );

// VERSION 2.1 - for authentication validation
// Added new version of onAuthChange
export const onAuthChange2 = (isAuthenticated,currentPagePrivacy) => {
  if (currentPagePrivacy==='unauth' && isAuthenticated) { // if on unauthenticated page and logged in, redirect to '/dashboard'
    // console.log('redirect to Dashboard');
    history.push('/dashboard');
  } else if (currentPagePrivacy==='auth' && !isAuthenticated) { // if on authenticated page and not logged in, redirect to '/'
    // console.log('redirect to login page');
    history.push('/');
  }
};
// //////////////////////////////////////////////

export const routes = (
  <Router history={history}>
    <Switch>
      {/* <Route exact path="/" render={()=><Login/>} /> */}
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      {/* <Route path="/dashboard/:id" component={Dashboard} /> */}
      <Route path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </Router>
);
