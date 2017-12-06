import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';

// Create named export Editor that is an ES6 class component
export class Editor extends React.Component {
  handleBodyChange(e) {
    this.props.meteorCall('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }
  handleTitleChange(e) {
    this.props.meteorCall('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }
  render() {
    // console.log('props',this.props);
    if (this.props.note) {
      return (
        <div>
          <div>
            <input type="text" value={this.props.note.title} onChange={this.handleTitleChange.bind(this)} placeholder="Untitled note"/>
          </div>
          <div>
            <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          </div>
          <button>Delete note</button>
        </div>
      );
    } else  {
      return <p>{ this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note to get started.' }</p>;
    }

    // console.log('this.props.note',this.props.note);
    // return (
    //   <div className="">
    //     { this.props.note ? this.props.note.body : undefined }
    //   </div>
    // );
  }
}

Editor.propTypes = {
  note: PropTypes.object
};

export default withTracker(()=>{
  Meteor.subscribe('notes');
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    meteorCall: Meteor.call
  };
})( Editor );
