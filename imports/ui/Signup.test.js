import {} from './setupTests';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';

import { Signup } from './Signup';

if (Meteor.isClient) {

  describe('Signup', function() {

    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper =  mount(<Signup createUser={()=>{}}/>);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function(){
      const email = "patesch@hotmail.com";
      const password = "123123123";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if short password', function(){
      const email = "patesch@hotmail.com";
      const password = "123      ";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(0);

    });

    it('should set createUser callback errors', function(){
      const reason = 'This is why it failed!';
      const password = "123123123";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy).toHaveBeenCalled();

      spy.calls[0].arguments[1]({reason});
      expect(wrapper.state('error').length).toNotBe(0);
      spy.calls[0].arguments[1]({reason});
      expect(wrapper.state('error')).toBe(reason);
    });

  });

}
