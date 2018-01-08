import {} from './setupTests';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {

  describe('Editor', function() {
    let browserHistory;
    let meteorCall;

    beforeEach(function(){
      meteorCall = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      }
    });

    it('should render pick note message', function(){
      const wrapper = mount(<Editor history={browserHistory} meteorCall={meteorCall}/>);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
    });

    it('should render not found message', function(){
      const wrapper = mount(<Editor history={browserHistory} meteorCall={meteorCall} selectedNoteId={notes[0]._id}/>);
      expect(wrapper.find('p').text()).toBe('Note not found');
    });

    it('should remove note', function() {
      const wrapper = mount(<Editor history={browserHistory} meteorCall={meteorCall} selectedNoteId={notes[0]._id} note={notes[0]} />);
      // simulate button click
      wrapper.find('button').simulate('click');
      // setup assertion for meteorCall spy and for push spy
      expect(meteorCall).toHaveBeenCalledWith('notes.remove',notes[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });

    it('should update the note body on textarea change', function(){
      const newBody = 'This is new body text';
      const wrapper = mount(<Editor history={browserHistory} meteorCall={meteorCall} selectedNoteId={notes[0]._id} note={notes[0]} />);
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(meteorCall).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody});
    });

    it('should update the note title on input change', function(){
      const newTitle = 'This is new title text';
      const wrapper = mount(<Editor history={browserHistory} meteorCall={meteorCall} selectedNoteId={notes[0]._id} note={notes[0]} />);
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(meteorCall).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle});
    });

    it('should set state for new note', function(){
      const wrapper = mount(<Editor history={browserHistory} meteorCall={meteorCall}/>);
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      //expect title state to be first notes title
      expect(wrapper.state('title')).toBe(notes[0].title);
      //expect body state to be first notes body
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not set state if note prop not provided', function(){
      const wrapper = mount(<Editor history={browserHistory} meteorCall={meteorCall}/>);
      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      //expect title state to be first notes title
      expect(wrapper.state('title')).toBe('');
      //expect body state to be first notes body
      expect(wrapper.state('body')).toBe('');
    });
  });
}
