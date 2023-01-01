import React, { Component } from "react";
import { auth } from "../../firebase";
import * as analytics from "./../../analytics/analytics";

const style = {
  margin: "15px auto",
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class PasswordForgetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      sent: false,
      error: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    analytics.initGA();
    analytics.logPageView();
  }

  onSubmit = (event) => {
    const isInvalid = this.state.email === "";

    if (this.state.email === "") {
      this.setState(byPropKey("error", "Please enter your Email"));
    } else {
      this.setState(byPropKey("error", null));
    }

    if (!isInvalid) {
      // password reset
      auth
        .doPasswordReset(this.state.email)
        .then(() => {
          this.setState({
            sent: true,
          });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/invalid-email") {
            this.setState(byPropKey("error", "Invalid Email Entered"));
          } else {
            alert(error);
          }
        });
    } else {
    }

    event.preventDefault();
  };

  render() {
    return (
      <div className="login-page">
        <form onSubmit={this.onSubmit} className="form">
          {this.state.error && (
            <h6 className="mb-2" style={{ color: "#dc3545" }}>
              <b>{this.state.error}</b>
            </h6>
          )}
          <input
            value={this.state.email}
            onChange={(event) => {
              this.setState({
                email: event.target.value,
              });
              if (event.target.value !== "") {
                this.setState(byPropKey("error", null));
              }
            }}
            type="text"
            className={this.state.error ? "is-invalid" : ""}
            placeholder="Email Address"
          />
          <button type="submit">reset password</button>
        </form>
        {this.state.sent ? (
          <div className="row">
            <div className="col-sm-12" style={style}>
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">
                  A Password Reset mail has been sent to your email id -{" "}
                  {this.state.email}
                </h4>
                <p>
                  Please reset your password - and then login to manage your
                  expenses
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    );
  }
}

export default PasswordForgetPage;
