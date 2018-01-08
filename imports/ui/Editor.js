import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';

import history from '../routes/history';

// Create named export Editor that is an ES6 class component
export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  componentDidUpdate(prevProps,prevState){
    const currentNoteid = this.props.note ? this.props.note._id : undefined;
    const prevNoteid =  prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteid && currentNoteid !== prevNoteid) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.meteorCall('notes.update', this.props.note._id, { body });
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.meteorCall('notes.update', this.props.note._id, { title });
  }
  handleRemoval() {
    this.props.meteorCall('notes.remove', this.props.note._id);
    history.push('/dashboard');
  }
  render() {
    // console.log('props',this.props);
    if (this.props.note) {
      return (
        <div>
          <div>
            <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="Untitled note"/>
          </div>
          <div>
            <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          </div>
          <button onClick={ () => this.handleRemoval() }>Delete note</button>
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
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  meteorCall: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withTracker(()=>{
  Meteor.subscribe('notes');
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    meteorCall: Meteor.call,
    history: history
  };
})( Editor );
