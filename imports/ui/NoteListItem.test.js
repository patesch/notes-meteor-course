import {} from './setupTests';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import moment from 'moment';

import { NoteListItem } from './NoteListItem';

import { notes, defaultNoteTitle } from '../fixtures/fixtures';

if (Meteor.isClient) {

  describe('NoteListItem', function() {
    let Session;

    beforeEach(()=>{
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and timestamp', function(){
      const note = notes[0];
      const wrapper = mount(<NoteListItem Session={Session} note={note}/>);
      const timeStamp = moment(note.updateAt).format('M/DD/YY');

      expect(wrapper.find('h5').first().text()).toBe(note.title);
      expect(wrapper.find('p').text()).toBe(timeStamp);
    });

    it('should set default title if no title set', function(){
      const note = notes[1];
      const wrapper = mount(<NoteListItem Session={Session} note={note}/>);

      expect(wrapper.find('h5').first().text()).toBe(defaultNoteTitle);
    });

    it('should call set on click', function(){
      const note = notes[0];
      const wrapper = mount(<NoteListItem Session={Session} note={note}/>);
      wrapper.find('div').simulate('click');

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', note._id);
    });

  });

}
