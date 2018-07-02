import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut/index";
import * as routes from "../../constants/routes";

const NavigationAuth = () => {
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
                    <Link
                        className={`nav-link ${window.location.pathname === "/home" ? "active" : "inactive"}`}
                        to={routes.HOME}
                    >
                        Home
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/account" ? "active" : "inactive"}`}
                        to={routes.ACCOUNT}
                    >
                        Account
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/month-view" ? "active" : "inactive"}`}
                        to={routes.MONTH_VIEW}
                    >
                        Monthly
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/daily-view" ? "active" : "inactive"}`}
                        to={routes.DAILY_VIEW}
                    >
                        Daily
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/filter-view" ? "active" : "inactive"}`}
                        to={routes.FILTER_VIEW}
                    >
                        filter
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/statistics" ? "active" : "inactive"}`}
                        to={routes.STATISTICS_VIEW}
                    >
                        Stats
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/loan" ? "active" : "inactive"}`}
                        to={routes.LOAN_VIEW}
                    >
                        Loan
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/settings" ? "active" : "inactive"}`}
                        to={routes.SETTINGS_VIEW}
                    >
                        Settings
                    </Link>
                    <Link className="nav-link" to={routes.SIGN_IN}>
                        <SignOutButton />
                    </Link>
                </div>
            </div>
            <div className="navNarrow">
                <i className="fa fa-bars fa-2x" onClick={burgerToggle} />
                <ul className="navbar-nav">
                    <h2 className="navbar-brand">Expense Manager</h2>
                </ul>
                <div className="narrowLinks">
                    <Link
                        className={`nav-link ${window.location.pathname === "/home" ? "active" : "inactive"}`}
                        to={routes.HOME}
                        onClick={burgerToggle}
                    >
                        Home
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/account" ? "active" : "inactive"}`}
                        to={routes.ACCOUNT}
                        onClick={burgerToggle}
                    >
                        Account
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/month-view" ? "active" : "inactive"}`}
                        to={routes.MONTH_VIEW}
                        onClick={burgerToggle}
                    >
                        Monthly
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/daily-view" ? "active" : "inactive"}`}
                        to={routes.DAILY_VIEW}
                        onClick={burgerToggle}
                    >
                        Daily
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/filter-view" ? "active" : "inactive"}`}
                        to={routes.FILTER_VIEW}
                        onClick={burgerToggle}
                    >
                        filter
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/statistics" ? "active" : "inactive"}`}
                        to={routes.STATISTICS_VIEW}
                        onClick={burgerToggle}
                    >
                        Stats
                    </Link>

                    <Link
                        className={`nav-link ${window.location.pathname === "/loan" ? "active" : "inactive"}`}
                        to={routes.LOAN_VIEW}
                        onClick={burgerToggle}
                    >
                        Loan
                    </Link>
                    <Link
                        className={`nav-link ${window.location.pathname === "/settings" ? "active" : "inactive"}`}
                        to={routes.SETTINGS_VIEW}
                        onClick={burgerToggle}
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

const Navigation = ({ authUser }) => {
    return <div>{authUser && authUser.emailVerified ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

export default Navigation;
