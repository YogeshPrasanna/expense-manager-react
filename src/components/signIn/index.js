import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../signUp/index';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import firebase from 'firebase';

const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }


  callGoogleSignIn = () => {

    const {
      history,
    } = this.props;

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;

      // The signed-in user info.
      var user = result.user;

      history.push(routes.HOME);

    }).catch((error) => {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      // The email of the user's account used.
      var email = error.email;

      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      alert(errorMessage , "Retry !!!")
      // ...
    });
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="login-page">
        <form onSubmit={this.onSubmit} className="form">
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          <hr />

          <div type="button" onClick={this.callGoogleSignIn} className="googleSignIn">
            <span className="googleLogo"><i className="fa fa-google"></i></span> Sign in with google
          </div>

          { error && <p>{error.message}</p> }
        </form>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};