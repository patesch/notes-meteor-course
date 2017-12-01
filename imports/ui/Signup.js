import React from 'react';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';
// import { Link } from 'react-router';
// import { withRouter, Link as RouterLink } from 'react-router';
import Link from '../routes/link';

import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9 ) {
      this.setState({error: 'Password must be more than 8 characters long'});
      // setTimeout(()=>this.setState({error: ''}), 3000);
      return;
    } else if (password.length > 20 ) {
      this.setState({error: 'Password must be at most 20 characters long'});
      // setTimeout(()=>this.setState({error: ''}), 3000);
      return;
    }

    this.props.createUser({email, password}, (err) => {
      if (!!err) {
        this.setState({error: err.reason});
        // setTimeout(()=>this.setState({error: ''}), 3000);
      } else {
        this.setState({error: ''});
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined }
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>
          {/* <Link className="" to="/">Have an account?</Link> */}
          <Link href="/" history={this.props.history}>Have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default withTracker(()=>{
  return {
    createUser: Accounts.createUser
  };
})( Signup );
