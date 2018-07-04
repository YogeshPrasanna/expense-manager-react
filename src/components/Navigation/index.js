import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut/index";
import * as routes from "../../constants/routes";

const NavigationAuth = props => {
    const burgerToggle = () => {
        let linksEl = document.querySelector(".narrowLinks");
        if (linksEl.style.display === "block") {
            linksEl.style.display = "none";
        } else {
            linksEl.style.display = "block";
        }
    };

    const nightMode = { background: "#00252C", color: "#F4D680" };

    const nightModeHeader = {
        background: "#00252C",
        color: "#9AD3CB",
        fontSize: "23px!important"
    };

    const mightModeToggle = { background: "#00252C", color: "#F4D680" };

    const daymode = { background: "#f8f9fa", color: "gray" };

    return (
        <nav style={props.settings.mode === "night" ? nightModeHeader : daymode}>
            <div className="navWide">
                <ul className="navbar-nav">
                    <h2 className="navbar-brand">Expense Manager</h2>
                </ul>
                <div className="wideDiv">
                    <Link
                        className={`nav-link ${window.location.pathname === "/home" ? "active" : "inactive"}`}
                        to={routes.HOME}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Home
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/account" ? "active" : "inactive"}`}
                        to={routes.ACCOUNT}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Account
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/month-view" ? "active" : "inactive"}`}
                        to={routes.MONTH_VIEW}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Monthly
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/daily-view" ? "active" : "inactive"}`}
                        to={routes.DAILY_VIEW}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Daily
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/filter-view" ? "active" : "inactive"}`}
                        to={routes.FILTER_VIEW}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        filter
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/statistics" ? "active" : "inactive"}`}
                        to={routes.STATISTICS_VIEW}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Stats
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/loan" ? "active" : "inactive"}`}
                        to={routes.LOAN_VIEW}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Loan
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/settings" ? "active" : "inactive"}`}
                        to={routes.SETTINGS_VIEW}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Settings
                    </Link>
                    <Link className="nav-link" to={routes.SIGN_IN}>
                        <SignOutButton />
                    </Link>
                </div>
            </div>
            <div className="navNarrow">
                <i
                    className="fa fa-bars fa-2x"
                    onClick={burgerToggle}
                    style={props.settings.mode === "night" ? mightModeToggle : daymode}
                />
                <ul className="navbar-nav">
                    <h2 className="navbar-brand" style={props.settings.mode === "night" ? nightModeHeader : daymode}>
                        Expense Manager
                    </h2>
                </ul>
                <div className="narrowLinks">
                    <Link
                        className={`nav-link ${window.location.pathname === "/home" ? "active" : "inactive"}`}
                        to={routes.HOME}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Home
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/account" ? "active" : "inactive"}`}
                        to={routes.ACCOUNT}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Account
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/month-view" ? "active" : "inactive"}`}
                        to={routes.MONTH_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Monthly
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/daily-view" ? "active" : "inactive"}`}
                        to={routes.DAILY_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Daily
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/filter-view" ? "active" : "inactive"}`}
                        to={routes.FILTER_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        filter
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/statistics" ? "active" : "inactive"}`}
                        to={routes.STATISTICS_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Stats
                    </Link>

                    <Link
                        className={`nav-link ${window.location.pathname === "/loan" ? "active" : "inactive"}`}
                        to={routes.LOAN_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Loan
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/settings" ? "active" : "inactive"}`}
                        to={routes.SETTINGS_VIEW}
                        onClick={burgerToggle}
                        style={props.settings.mode === "night" ? nightMode : daymode}
                    >
                        Settings
                    </Link>
                    <Link className="nav-link" to={routes.SIGN_IN} onClick={burgerToggle}>
                        <SignOutButton />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const NavigationNonAuth = () => {
    const burgerToggle = () => {
        let linksEl = document.querySelector(".narrowLinks");
        if (linksEl.style.display === "block") {
            linksEl.style.display = "none";
        } else {
            linksEl.style.display = "block";
        }
    };

    return (
        <nav>
            <div className="navWide">
                <ul className="navbar-nav">
                    <h2 className="navbar-brand">Expense Manager</h2>
                </ul>
                <div className="wideDiv">
                    {/* <Link
                        className={`nav-link ${window.location.pathname === "/signin" ? "active" : "inactive"}`}
                        to={routes.SIGN_IN}
                    >
                        Sign In
                    </Link> */}

                    <Link
                        className={`nav-link ${window.location.pathname === "/" ? "active" : "inactive"}`}
                        to={routes.SIGN_IN}
                    >
                        Sign In
                    </Link>
                </div>
            </div>
            <div className="navNarrow">
                <i className="fa fa-bars fa-2x" onClick={burgerToggle} />
                <ul className="navbar-nav">
                    <h2 className="navbar-brand">Expense Manager</h2>
                </ul>
                <div className="narrowLinks">
                    {/* <Link
                        className={`nav-link ${window.location.pathname === "/signin" ? "active" : "inactive"}`}
                        to={routes.SIGN_IN}
                        onClick={burgerToggle}
                    >
                        Sign In
                    </Link> */}

                    <Link
                        className={`nav-link ${window.location.pathname === "/" ? "active" : "inactive"}`}
                        to={routes.SIGN_IN}
                        onClick={burgerToggle}
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const Navigation = ({ authUser, settings }) => {
    return (
        <div>
            {authUser && authUser.emailVerified && settings ? (
                <NavigationAuth settings={settings} />
            ) : (
                <NavigationNonAuth />
            )}
        </div>
    );
};

export default Navigation;
