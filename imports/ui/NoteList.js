import React from 'react';
import PropTypes from 'prop-types';

import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
  return (
    <div>
        NoteList: { props.notes.length }
        { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
        { props.notes.map((note) => {
          return <NoteListItem key={note._id} note={note}/>
        }) }
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  return {
    'notes': Notes.find().fetch().map((note)=>{
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
})( NoteList );
