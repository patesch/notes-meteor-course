import React from 'react';
import PropTypes from 'prop-types';

import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={()=>props.meteorCall('notes.insert')}> Create note </button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
};

export default withTracker(()=>{
  return {
    'meteorCall': Meteor.call
  }
})( NoteListHeader );
