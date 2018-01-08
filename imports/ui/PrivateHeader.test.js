import {} from './setupTests';

import { Meteor } from 'meteor/meteor';
import React from 'react';

import expect from 'expect';
import { shallow, mount, render } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

// see https://github.com/airbnb/enzyme

if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    let browserHistory;

    beforeEach(function(){
      browserHistory = {
        push: expect.createSpy()
      }
    });

    it('should set button text to logout', function(){
      const wrapper = mount( <PrivateHeader title="Test title" history={browserHistory} handleLogout={()=>{}}/> );
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title props as h1 text', function(){
      const title = 'Test title';
      const wrapper = mount( <PrivateHeader title={title} history={browserHistory} handleLogout={()=>{}}/> );
      const h1Text = wrapper.find('h1').text();

      expect(h1Text).toBe(title);
    });

    // it('should call the function', function(){
    //   const spy = expect.createSpy();
    //   spy(3, 4, 123);
    //   spy('Andrew');
    //   expect(spy).toHaveBeenCalledWith(3, 4, 123);
    //   expect(spy).toHaveBeenCalledWith('Andrew');
    // });

    it('should call handleLogout on click', function() {
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title="Title" history={browserHistory} handleLogout={spy} /> );

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });

  });
}
