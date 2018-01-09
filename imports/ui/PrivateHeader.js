import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';

// import { Meteor } from 'meteor/meteor';

// import { createContainer } from 'meteor/react-meteor-data';
import { withTracker, createContainer } from 'meteor/react-meteor-data';

import Link from '../routes/link';

// ES6 Container Component
// export default class PrivateHeader extends React.Component {
//   onLogout () {
//     Accounts.logout();
//     // setTimeout(() => {console.log('Logout:user', Meteor.user())}, 400 );
//     this.props.history.push('/');
//   }
//   render () {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <button onClick={this.onLogout.bind(this)}>Logout</button>
//       </div>
//     );
//   }
// }

export const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" src={navImageSrc} onClick={()=>props.handleNavToggle()}/>
        {/* <h1 className="header__title">{props.title}</h1> */}
        <h1 className="header__title"><Link className="dashboard" href="/dashboard" history={props.history}>{props.title}</Link></h1>
        <button className="button button--link-text" onClick={() => props.handleLogout() }>Logout</button>
      </div>
    </div>
  );
  // return (
  //   <div className="title-bar">
  //     <div className="title-bar__content">
  //       <h1 className="title-bar__title">{props.title}</h1>
  //       <button className="button button--link" onClick={() => Accounts.logout()}>Logout</button>
  //     </div>
  //   </div>
  // );
};

PrivateHeader.propTypes = {
  history: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleNavToggle: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired
};

// export default createContainer(() => {
export default withTracker(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
})( PrivateHeader );
// }, PrivateHeader );

// export default PrivateHeader;
