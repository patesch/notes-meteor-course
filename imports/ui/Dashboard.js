import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import PrivateHeader from './PrivateHeader';
import NoteListHeader from './NoteListHeader';
import NoteList from './NoteList';
import Editor from './Editor';

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
  constructor(props) {
    super(props);
    // console.log(props.history);
    console.log(location.pathname.split('/')[2]);
    props.Session.set('selectedNoteId',location.pathname.split('/')[2]);

    if (!Meteor.userId()) {
      props.history.push('/');
      console.log('Dashboard constructor: user is not logged in -> redirect to Login page');
    } else {
      console.log('Dashboard constructor: user is logged in -> kept in Dashboard page');
    }
  }
  // OR
  // componentWillMount ...
  componentWillMount() {
    // console.log('componentWillMount:history',this.props.history);
    // console.log('componentWillMount:location', location);
    // this.props.Session.set('selectedNoteId',location.pathname.split('/')[2]);
  }
  render () {
    this.props.Session.set('selectedNoteId',location.pathname.split('/')[2]);

    return (
      <div>
        <PrivateHeader title="Dashboard" history={this.props.history} />
        <div className="page-content">
          <div className="page-content__list">
            <NoteListHeader/>
            <NoteList/>
          </div>
          <div className="page-content__editor">
            <Editor/>
          </div>
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
