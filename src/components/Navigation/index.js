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
                    <Link className="nav-link" to={routes.HOME}>
                        Home
                    </Link>
                    <Link className="nav-link" to={routes.ACCOUNT}>
                        Account
                    </Link>
                    <Link className="nav-link" to={routes.MONTH_VIEW}>
                        Monthly
                    </Link>
                    <Link className="nav-link" to={routes.DAILY_VIEW}>
                        Daily
                    </Link>
                    <Link className="nav-link" to={routes.FILTER_VIEW}>
                        filter
                    </Link>
                    <Link className="nav-link" to={routes.STATISTICS_VIEW}>
                        Stats
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
                    <Link className="nav-link" to={routes.HOME} onClick={burgerToggle}>
                        Home
                    </Link>
                    <Link className="nav-link" to={routes.ACCOUNT} onClick={burgerToggle}>
                        Account
                    </Link>
                    <Link className="nav-link" to={routes.MONTH_VIEW} onClick={burgerToggle}>
                        Monthly
                    </Link>
                    <Link className="nav-link" to={routes.DAILY_VIEW} onClick={burgerToggle}>
                        Daily
                    </Link>
                    <Link className="nav-link" to={routes.FILTER_VIEW} onClick={burgerToggle}>
                        filter
                    </Link>
                    <Link className="nav-link" to={routes.STATISTICS_VIEW} onClick={burgerToggle}>
                        Stats
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
                    <Link className="nav-link" to={routes.SIGN_IN}>
                        Sign In
                    </Link>

                    <Link className="nav-link" to={routes.LANDING}>
                        Landing
                    </Link>
                </div>
            </div>
            <div className="navNarrow">
                <i className="fa fa-bars fa-2x" onClick={burgerToggle} />
                <ul className="navbar-nav">
                    <h2 className="navbar-brand">Expense Manager</h2>
                </ul>
                <div className="narrowLinks">
                    <Link className="nav-link" to={routes.SIGN_IN} onClick={burgerToggle}>
                        Sign In
                    </Link>

                    <Link className="nav-link" to={routes.LANDING} onClick={burgerToggle}>
                        Landing
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
