import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import PrivateHeader from './PrivateHeader';
import NoteListHeader from './NoteListHeader';
import NoteList from './NoteList';

// import history from '../routes/history';

// // Stateless Functional Components
// export default () => {
//   return (
//     <div>
//       <PrivateHeader title="Dashboard" />
//       <div className="page-content">
//         <NoteListHeader/>
//         <NoteList/>
//       </div>
//     </div>
//   );
// }

// Container Components
export class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // console.log(props.history);
  //   console.log(location.pathname.split('/')[2]);
  //   props.Session.set('selectedNoteId',location.pathname.split('/')[2]);
  // }
  // OR
  // componentWillMount ...
  componentWillMount() {
    // console.log('componentWillMount:history',this.props.history);
    // console.log('componentWillMount:location', location);
    this.props.Session.set('selectedNoteId',location.pathname.split('/')[2]);
  }
  render () {
    return (
      <div>
        <PrivateHeader title="Dashboard" />
        <div className="page-content">
          <NoteListHeader/>
          <NoteList/>
        </div>
      </div>
    );
  }
};

Dashboard.propTypes = {
  Session: PropTypes.object.isRequired
};

export default withTracker(()=>{
  return {
    Session: Session
  }
})( Dashboard );
