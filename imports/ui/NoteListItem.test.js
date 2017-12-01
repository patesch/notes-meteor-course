import {} from './setupTests';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {

  describe('NoteListItem', function() {

    it('should render title and timestamp', function(){
      const title = 'my note title';
      const updatedAt = 1512148253172;
      const note = { title, updatedAt };
      const wrapper = mount(<NoteListItem note={note}/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('12/01/17');
    });

    it('should set default title if no title set', function(){
      const defaultTitle = 'Untitled note';
      const title = '';
      const updatedAt = 1512148253172;
      const note = { title, updatedAt };
      const wrapper = mount(<NoteListItem note={note}/>);

      expect(wrapper.find('h5').text()).toBe(defaultTitle);
    });

  });

}
