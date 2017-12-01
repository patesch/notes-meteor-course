import {} from './setupTests';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {

  describe('NoteListHeader', function() {

    it('should call meteoCall on click', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy}/>);

      wrapper.find('button').simulate('click');

      // expect(spy).toHaveBeenCalled();
      // expect(spy.calls[0].arguments[0]).toBe('notes.insert');
      // OR
      expect(spy).toHaveBeenCalledWith('notes.insert');      
    });

  });

}
