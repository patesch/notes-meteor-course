import {} from './setupTests';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {

  describe('Login', function() {

    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper =  mount(<Login loginWithPassword={()=>{}}/>);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function(){
      const email = "patesch@hotmail.com";
      const password = "123123123";
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe( password );
    });

    it('should set loginWithPassword callback errors', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);
      const reason = 'some error';

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({reason});
      expect(wrapper.state('error').length).toNotBe(0);
      spy.calls[0].arguments[2]({reason});
      expect(wrapper.state('error')).toBe(reason);

    });

  });

}
