import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

export const validateNewUser = (user) => {
   const email = user.emails[0].address;
   console.log('email', email);
   new SimpleSchema({
     email: {
       type: String,
       label: 'Your email',
       regEx: SimpleSchema.RegEx.Email
     }
   }).validate({ email });
   return true;
 };

export const validateLoginAttempt = attempt => attempt.allowed;

if (Meteor.isServer) {
   Accounts.validateNewUser(validateNewUser);
   Accounts.validateLoginAttempt(validateLoginAttempt);
}
