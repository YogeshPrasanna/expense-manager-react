import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { SignUpLink } from "../signUp/index";
import { auth } from "../../firebase";
import * as routes from "../../constants/routes";
import * as analytics from "./../../analytics/analytics";

import logo from "./../../assets/images/logo.png";
import homeScreen from "./../../assets/images/Home1.png";
import monthScreen from "./../../assets/images/MONTHLY_NIGHT_MODE.png";
import statisticsScreen from "./../../assets/images/STATISTICS_NIGHT_MODE.png";
import savingsScreen from "./../../assets/images/SAVINGS_NIGHT.png";
import homeMobile from "./../../assets/images/HOME_MOBILE.png";
import monthMobile from "./../../assets/images/MONTH_MOBILE.png";
import statsMobile from "./../../assets/images/STATISTICS_MOBILE.png";
import travel from "./../../assets/images/travel.png";

import Loader from "./../Common/Loader";

import firebase from "firebase/compat/app";

const SignInPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  validationEmail: null,
  validationPassword: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE, isLoading: false };

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        props.history.push("/home");
      } else {
        props.history.push("/");
      }
    });
  }

  componentDidMount() {
    analytics.initGA();
    analytics.logPageView();
  }

  callGoogleSignIn = () => {
    this.setState(byPropKey("isLoading", true));
    const { history } = this.props;
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        this.setState(byPropKey("isLoading", false));
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        history.push(routes.HOME);
      })
      .catch((error) => {
        this.setState(byPropKey("isLoading", false));
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        alert(errorMessage, "Retry !!!");
        // ...
      });
  };

  onSubmit = (event) => {
    this.setState(byPropKey("isLoading", true));
    const { email, password } = this.state;
    const { history } = this.props;
    const isInvalid = email === "" || password === "";

    if (email === "") {
      this.setState(byPropKey("validationEmail", "Please enter your Email"));
      this.setState(byPropKey("error", "Please enter your Email"));
    } else {
      this.setState(byPropKey("validationEmail", null));
      this.setState(byPropKey("error", null));
      if (password === "") {
        this.setState(
          byPropKey("validationPassword", "Please enter your Password")
        );
        this.setState(byPropKey("error", "Please enter your Password"));
      } else {
        this.setState(byPropKey("validationPassword", null));
        this.setState(byPropKey("error", null));
      }
    }

    if (!isInvalid) {
      auth
        .doSignInWithEmailAndPassword(email.trim(), password)
        .then((authUser) => {
          this.setState(byPropKey("isLoading", false));
          if (authUser) {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          this.setState(byPropKey("isLoading", false));

          if (errorCode === "auth/wrong-password") {
            this.setState(
              byPropKey(
                "error",
                "Error Wrong Password Please Enter Correct Password!"
              )
            );
            this.setState(byPropKey("validationPassword", true));
          } else if (errorCode === "auth/user-not-found") {
            this.setState(byPropKey("error", "Error User Not Found!"));
            this.setState(byPropKey("validationEmail", true));
          } else if (errorCode === "auth/too-many-requests") {
            this.setState(
              byPropKey("error", "Error Too Many Requests, Try Again Later!")
            );
          } else {
            this.setState(byPropKey("error", "Error, Unable To Sign In!"));
          }
        });
    } else {
      this.setState(byPropKey("isLoading", false));
    }

    event.preventDefault();
  };

  render() {
    const { email, password, error, isLoading } = this.state;

    const imgStyle = {
      margin: "25px 35%",
    };

    const isInvalid = password === "" || email === "";

    const fullHeight = {
      minHeight: "100vh",
    };

    const areaPadding = {
      padding: "7%",
    };

    const areaMonthPadding = {
      padding: "5% 7%",
    };

    const homeImgStyle = {
      verticaAlign: "middle",
      borderRadius: "10px",
      boxShadow: "100px solid red",
      boxShadow: "20px 20px rgba(0,0,0,0.4)",
      borderStyle: "none",
      width: "100%",
      height: "auto",
    };

    return (
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "88vh" }}>
          <div className="col-sm-12 col-md-6" style={areaPadding}>
            <div className="landing">
              <img src={logo} style={imgStyle} width="auto" height="100" />
              <span>
                Expense Manager which takes note of all your daily expenses
              </span>
              <hr />
              <p>
                Sign up to create an account - and start managing your expenses Test Deploy Commit
              </p>
              <hr />
              <iframe
                src="https://ghbtns.com/github-btn.html?user=YogeshPrasanna&repo=expense-manager-react&type=star&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="160px"
                height="30px"
              ></iframe>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=YogeshPrasanna&repo=expense-manager-react&type=fork&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="158px"
                height="30px"
              ></iframe>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center"
            style={{ paddingBottom: "5rem" }}
          >
            <div className="login-page">
              <form onSubmit={this.onSubmit} className="form">
                {this.state.error && (
                  <h6 className="mb-2" style={{ color: "#dc3545" }}>
                    <b>{this.state.error}</b>
                  </h6>
                )}
                <input
                  value={email}
                  onChange={(event) => {
                    this.setState(byPropKey("email", event.target.value));
                    if (event.target.value !== "") {
                      this.setState(byPropKey("validationEmail", null));
                      this.setState(byPropKey("error", null));
                    }
                  }}
                  className={this.state.validationEmail ? "is-invalid" : ""}
                  type="text"
                  placeholder="Email Address"
                />
                <input
                  value={password}
                  onChange={(event) => {
                    this.setState(byPropKey("password", event.target.value));
                    if (event.target.value !== "") {
                      this.setState(byPropKey("validationPassword", null));
                      this.setState(byPropKey("error", null));
                    }
                  }}
                  className={this.state.validationPassword ? "is-invalid" : ""}
                  type="password"
                  placeholder="Password"
                />
                {!isLoading ? (
                  <>
                    <button type="submit">Sign In</button>

                    <p className="my-3">
                      <Link to={routes.PASSWORD_FORGET}>Forgot password?</Link>
                    </p>

                    <div
                      type="button"
                      onClick={this.callGoogleSignIn}
                      className="googleSignIn"
                    >
                      <span className="googleLogo">
                        <i className="fa fa-google" />
                      </span>{" "}
                      Sign in with google
                    </div>
                  </>
                ) : (
                  <Loader />
                )}
              </form>
              <SignUpLink />
            </div>
          </div>
        </div>
        <div className="row landing-home-section" style={fullHeight}>
          <div className="col-sm-12 col-md-8" style={areaPadding}>
            {window.screen.width > 720 ? (
              <img src={homeScreen} style={homeImgStyle} />
            ) : (
              <img
                src={homeMobile}
                style={homeImgStyle}
                width="auto"
                height="auto"
              />
            )}
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="landing-home-section-title">
              Simplest way to manage personal finances. <hr />
              Yes your money matters.
            </div>
          </div>
        </div>
        <div className="row landing-month-section" style={fullHeight}>
          <div className="col-sm-12 col-md-4" style={areaPadding}>
            <div className="landing-home-section-title">
              Peek View Of your monthly Spendings
            </div>
          </div>
          <div className="col-sm-12 col-md-8" style={areaMonthPadding}>
            {window.screen.width > 720 ? (
              <img src={monthScreen} style={homeImgStyle} />
            ) : (
              <img
                src={monthMobile}
                style={homeImgStyle}
                width="auto"
                height="auto"
              />
            )}
          </div>
        </div>
        <div className="row landing-stats-section" style={fullHeight}>
          <div className="col-sm-12 col-md-8" style={areaPadding}>
            {window.screen.width > 720 ? (
              <img src={statisticsScreen} style={homeImgStyle} />
            ) : (
              <img
                src={statsMobile}
                style={homeImgStyle}
                width="auto"
                height="auto"
              />
            )}
          </div>
          <div className="col-sm-12 col-md-4">
            <div
              className="landing-home-section-title"
              style={{ fontSize: "2.7em" }}
            >
              The whole picture in one place. <hr />
              Understand how you're spending your money with easy-to-read
              graphs.
            </div>
          </div>
        </div>
        <div className="row landing-savings-section" style={fullHeight}>
          <div className="col-sm-12 col-md-4" style={{ padding: "0 0 0 7%" }}>
            <div className="landing-home-section-title">
              Keep track on your savings to meet your financial goals.
            </div>
          </div>
          <div className="col-sm-12 col-md-8" style={areaMonthPadding}>
            {window.screen.width > 720 ? (
              <img src={savingsScreen} style={homeImgStyle} />
            ) : (
              <img
                src={monthMobile}
                style={homeImgStyle}
                width="auto"
                height="auto"
              />
            )}
          </div>
        </div>
        {window.screen.width > 720 ? (
          <div className="row landing-mobile-section" style={fullHeight}>
            <div className="col-sm-12 col-md-9" style={{ padding: "2%" }}>
              <img
                src={homeMobile}
                style={{ ...homeImgStyle, margin: "15px", width: "27%" }}
                width="auto"
                height="auto"
              />
              <img
                src={monthMobile}
                style={{ ...homeImgStyle, margin: "15px", width: "27%" }}
                width="auto"
                height="auto"
              />
              <img
                src={statsMobile}
                style={{ ...homeImgStyle, margin: "15px", width: "27%" }}
                width="auto"
                height="auto"
              />
            </div>
            <div className="col-sm-12 col-md-3">
              <div
                className="landing-home-section-title"
                style={{ fontSize: "2.7em" }}
              >
                Expense Manager is a progressive Web application <hr />
                This can be used even as an app in mobile
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
        <div className="row landing-travel-section" style={fullHeight}>
          <div className="col-sm-12 col-md-4" style={{ padding: "0 0 0 7%" }}>
            <div
              className="landing-home-section-title"
              style={{ fontSize: "2.7em" }}
            >
              Travel Ready <hr /> Never Worry We'll Convert your travel currency
              to your native currency
            </div>
          </div>
          <div className="col-sm-12 col-md-8" style={areaMonthPadding}>
            {window.screen.width > 720 ? (
              <img
                src={travel}
                style={{ ...homeImgStyle, boxShadow: "none" }}
              />
            ) : (
              <img
                src={travel}
                style={{ ...homeImgStyle, boxShadow: "none" }}
                width="300"
                height="300"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
