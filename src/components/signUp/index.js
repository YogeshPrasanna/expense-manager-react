import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, db } from "../../firebase";
import * as routes from "../../constants/routes";

import * as analytics from "./../../analytics/analytics";

import Loader from "./../Common/Loader";

const SignUpPage = ({ history }) => (
  <div>
    <SignUpForm history={history} />
  </div>
);

// In Intial State I put all of the form's validation error
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  validationFullName: null,
  validationEmail: null,
  validationPassword: null,
  validationCP: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE, isLoading: false };
  }

  componentDidMount() {
    analytics.initGA();
    analytics.logPageView();
  }

  onSubmit = (event) => {
    this.setState(byPropKey("isLoading", true));
    const { username, email, passwordOne, passwordTwo } = this.state;

    const { history } = this.props;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    if (username === "") {
      this.setState(
        byPropKey("validationFullName", "Please enter your Full Name")
      );
    } else {
      this.setState(byPropKey("validationFullName", null));
    }

    if (email === "") {
      this.setState(byPropKey("validationEmail", "Please enter your Email"));
    } else {
      this.setState(byPropKey("validationEmail", null));
    }

    if (passwordOne === "") {
      this.setState(
        byPropKey("validationPassword", "Please enter your Password")
      );
    } else {
      this.setState(byPropKey("validationPassword", null));
      if (passwordOne !== passwordTwo) {
        this.setState(
          byPropKey("validationCP", "Confirm Password is not equal to Password")
        );
      } else {
        this.setState(byPropKey("validationCP", null));
      }
    }

    if (!isInvalid) {
      auth
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          // create a user in the firebase db too
          db.doCreateUser(authUser.user.uid, username, email)
            .then(() => {
              this.setState(byPropKey("isLoading", false));
              this.setState(() => ({ ...INITIAL_STATE }));
              history.push(routes.HOME);
            })
            .catch((error) => {
              this.setState(byPropKey("isLoading", false));
              this.setState(byPropKey("error", error));
            });

          if (!authUser.emailVerified) {
            // send a verification mail to user
            authUser
              .sendEmailVerification()
              .then(function () {
                this.setState(byPropKey("isLoading", false));
                history.push(routes.USER_VERIFICATION);
              })
              .catch(function (error) {
                this.setState(byPropKey("isLoading", false));
                alert("something went wrong: ", error);
              });
          }
        })
        .catch((error) => {
          this.setState(byPropKey("isLoading", false));
          this.setState(byPropKey("error", error));
        });
    } else {
      this.setState(byPropKey("isLoading", false));
    }

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      validationFullName,
      validationCP,
      validationEmail,
      validationPassword,
      isLoading,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    let errorMessage = "";
    if (error) {
      if (error.code === "auth/email-already-in-use")
        errorMessage = "Email is already taken";
      else {
        errorMessage = "Unable to create an account";
      }
    }

    return (
      <div className="login-page">
        <form onSubmit={this.onSubmit} className="form">
          {/* Full Name */}
          <div className="mb-3">
            <input
              value={username}
              onChange={(event) => {
                this.setState(byPropKey("username", event.target.value));
                if (event.target.value !== "") {
                  this.setState(byPropKey("validationFullName", null));
                }
              }}
              type="text"
              className={
                validationFullName
                  ? "form-control mb-0 px-3 py-4 is-invalid"
                  : "form-control mb-0 px-3 py-4"
              }
              id="validationFullName"
              placeholder="Full Name"
            />
            {validationFullName ? (
              <div className="invalid-feedback">{validationFullName}</div>
            ) : (
              ""
            )}
          </div>

          {/* Email Address */}
          <div className="mb-3">
            <input
              value={email}
              onChange={(event) => {
                this.setState(byPropKey("email", event.target.value));
                if (event.target.value !== "") {
                  this.setState(byPropKey("validationEmail", null));
                }
              }}
              type="email"
              className={
                validationEmail
                  ? "form-control mb-0 px-3 py-4 is-invalid"
                  : "form-control mb-0 px-3 py-4"
              }
              id="validationEmail"
              placeholder="Email Address"
            />
            {validationEmail ? (
              <div className="invalid-feedback">{validationEmail}</div>
            ) : (
              ""
            )}
          </div>

          {/* Password One */}
          <div className="mb-3">
            <input
              value={passwordOne}
              onChange={(event) => {
                this.setState(byPropKey("passwordOne", event.target.value));
                if (event.target.value !== "") {
                  this.setState(byPropKey("validationPassword", null));
                }
              }}
              type="password"
              className={
                validationPassword
                  ? "form-control mb-0 px-3 py-4 is-invalid"
                  : "form-control mb-0 px-3 py-4"
              }
              id="validationPassword"
              placeholder="Password"
            />
            {validationPassword ? (
              <div className="invalid-feedback">{validationPassword}</div>
            ) : (
              ""
            )}
          </div>

          {/* Password Two */}
          <div className="mb-3">
            <input
              value={passwordTwo}
              onChange={(event) => {
                this.setState(byPropKey("passwordTwo", event.target.value));
                if (event.target.value !== "") {
                  this.setState(byPropKey("validationCP", null));
                }
              }}
              type="password"
              className={
                validationCP
                  ? "form-control mb-0 px-3 py-4 is-invalid"
                  : "form-control mb-0 px-3 py-4"
              }
              id="validationCP"
              placeholder="Confirm Password"
            />
            {validationCP ? (
              <div className="invalid-feedback">{validationCP}</div>
            ) : (
              ""
            )}
          </div>

          {!isLoading ? <button type="submit">Sign Up</button> : <Loader />}

          {error && !isLoading && (
            <p className="mt-3 mb-0 text-danger">
              <b>{errorMessage}</b>
            </p>
          )}
        </form>
        <p style={StyleInSignUp}>
          Already a user? <Link to={routes.SIGN_IN}>Sign in</Link>
        </p>
      </div>
    );
  }
}
const style = {
  textAlign: "center",
};

const StyleInSignUp = {
  marginTop: "-10px",
  textAlign: "center",
};

const SignUpLink = () => (
  <p style={style}>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
