import React from "react";
import url from "./man.png";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import Loader from "./../Common/Loader";

const AccountPage = props => {
    const userImage = {
        width: "200px",
        height: "200px",
        borderRadius: "15px",
        margin: "2% auto 0 auto",
        display: "block"
    };

    const center = {
        margin: "0 auto",
        display: "block"
    };

    const styleFromSettings = {
        fontFamily: props.settings ? props.settings.font : "sans-serif",
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#484842" : "#EDF0EF") : "#EDF0EF",
        minHeight: "91vh",
        padding: "2.33%"
    };

    if (props.user) {
        const test = {
            borderRadius: "10px",
            outline: "none"
        };

        if (props.settings) {
            return (
                <div className="container-fluid" style={props.settings.mode === "night" ? styleFromSettings : center}>
                    <img src={props.user.photoURL || url} style={userImage} alt="something's wrong" />
                    <div className="row">
                        <div className="col-sm-10 col-md-10 col-lg-5" style={center}>
                            <div className="card card3">
                                <div className="card-body">
                                    <h5 className="card-title">Hello {props.user.displayName || props.user.email}</h5>
                                    <hr />
                                    <p className="card-title">Registered email : {props.user.email}</p>
                                    <hr />
                                    <p className="card-title">
                                        {props.user.emailVerified ? "User is verified" : "User not verified"}
                                    </p>
                                    <hr />
                                    <button classame="btn btn-default" style={test}>
                                        <Link to={routes.UPDATE_PASSWORD}> update password </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
    } else {
        return (
            <div className="container">
                <img src={url} style={userImage} alt="somethig's wrong" />
                <div className="row">
                    <div className="col-sm-5" style={center}>
                        <div className="card card3">
                            <div className="card-body">
                                <h5 className="card-title">Hello User</h5>
                                <hr />
                                <p className="card-title">Getting your registered email</p>
                                <hr />
                                <p className="card-title">{"we're checking wether you're a verified user"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AccountPage;
