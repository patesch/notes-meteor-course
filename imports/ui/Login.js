import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';
// import { Link } from 'react-router';
import Link from '../routes/link';

import { withTracker } from 'meteor/react-meteor-data';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    if (Meteor.loggingIn())
      props.history.push('/dashboard');
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    this.props.loginWithPassword({email}, password, (err) => {
      if (!!err) {
        this.setState({error: err.reason});
        setTimeout(()=>this.setState({error: ''}), 3000);
      } else {
        this.props.history.push('/dashboard');
      }
    });
  }
  render() {
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Login</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined }
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Login</button>
            </form>
            {/* <Link to="/signup" location={{pathname: "/signup"}}>Need an account?</Link> */}
            <Link href="/signup" history={this.props.history}>Need an account?</Link>
          </div>
        </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};

export default withTracker(()=>{
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
})( Login );
