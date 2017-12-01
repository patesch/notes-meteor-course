import {} from './setupTests';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';

const notes = [
  {
    _id: 'noteId1',
    title: 'Test title',
    body: '',
    updateAt: 0,
    userId: 'userId1'
  }, {
    _id: 'noteId2',
    title: '',
    body: 'Something is here',
    updateAt: 0,
    userId: 'userId2'
  }
];

const emptyNoteList = [];

if (Meteor.isClient) {

  describe('NoteList', function() {

    it('should render noteListItem for each note', function(){
      const wrapper = mount(<NoteList notes={notes}/>);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render noteListEmptyItem if zero notes', function(){
      const wrapper = mount(<NoteList notes={emptyNoteList}/>);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });

  });

}
