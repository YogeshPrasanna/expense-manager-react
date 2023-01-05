import React from "react";
import history from "../history";

function Welcome() {
  const refresh = () => window.location.reload(true);
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="row" style={{ marginTop: "-5rem" }}>
          <div className="col">
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading text-center">
                Welcome to Expense Manager Application!
              </h4>
              <p className="text-center" style={{ fontSize: "0.85rem" }}>
                Created by Yogesh, and Maintained and Improved by UM Students!
              </p>
              <hr />
              <p className="text-center">
                Please Click on the link below to Sign In to your account!
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-success"
                onClick={() => {
                  history.push("/home");
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
