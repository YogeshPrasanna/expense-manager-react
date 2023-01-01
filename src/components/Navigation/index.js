import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut/index";
import * as routes from "../../constants/routes";

import history from "../history";

const NavigationAuth = (props) => {
  const burgerToggle = () => {
    const linksEl = document.querySelector(".narrowLinks");
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
    fontSize: "23px!important",
  };

  const mightModeToggle = { background: "#00252C", color: "#F4D680" };

  const daymode = { background: "#f8f9fa", color: "gray" };
  const dayModeLink = { color: "gray" };
  const nightModeLink = { background: "#00252C", color: "#F4D680" };

  return (
    <nav style={props.settings.mode === "night" ? nightModeHeader : daymode}>
      <div className="navWide">
        <ul className="navbar-nav">
          <div className="d-flex pt-1">
            <div className="d-flex justify-content-center align-items-center">
              <i
                className="fa fa-chevron-left fa-2x mr-2"
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>

            <h2 className="navbar-brand mb-0">Expense Manager</h2>
          </div>
        </ul>
        <div className="wideDiv">
          {/* <Link
            className={`nav-link ${
              window.location.pathname === "/modalexample"
                ? "active"
                : "inactive"
            }`}
            to={routes.MODAL_EXAMPLE}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Modal Example
          </Link> */}
          <Link
            className={`nav-link ${
              window.location.pathname === "/home" ? "active" : "inactive"
            }`}
            to={routes.HOME}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Home
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/month-view" ? "active" : "inactive"
            }`}
            to={routes.MONTH_VIEW}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Monthly
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/daily-view" ? "active" : "inactive"
            }`}
            to={routes.DAILY_VIEW}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Daily
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/filter-view"
                ? "active"
                : "inactive"
            }`}
            to={routes.FILTER_VIEW}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            filter
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/statistics" ? "active" : "inactive"
            }`}
            to={routes.STATISTICS_VIEW}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Stats
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/loan" ? "active" : "inactive"
            }`}
            to={routes.LOAN_VIEW}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Loan
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/savings" ? "active" : "inactive"
            }`}
            to={routes.SAVINGS_VIEW}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Savings
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/settings" ? "active" : "inactive"
            }`}
            to={routes.SETTINGS_VIEW}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
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
          <h2
            className="navbar-brand"
            style={props.settings.mode === "night" ? nightModeHeader : daymode}
          >
            Expense Manager
          </h2>
        </ul>
        <div className="narrowLinks">
          <Link
            className={`nav-link ${
              window.location.pathname === "/home" ? "active" : "inactive"
            }`}
            to={routes.HOME}
            onClick={burgerToggle}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Home
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/month-view" ? "active" : "inactive"
            }`}
            to={routes.MONTH_VIEW}
            onClick={burgerToggle}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Monthly
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/daily-view" ? "active" : "inactive"
            }`}
            to={routes.DAILY_VIEW}
            onClick={burgerToggle}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Daily
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/filter-view"
                ? "active"
                : "inactive"
            }`}
            to={routes.FILTER_VIEW}
            onClick={burgerToggle}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            filter
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/statistics" ? "active" : "inactive"
            }`}
            to={routes.STATISTICS_VIEW}
            onClick={burgerToggle}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Stats
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/loan" ? "active" : "inactive"
            }`}
            to={routes.LOAN_VIEW}
            onClick={burgerToggle}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Loan
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/savings" ? "active" : "inactive"
            }`}
            to={routes.SAVINGS_VIEW}
            onClick={burgerToggle}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
          >
            Savings
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/settings" ? "active" : "inactive"
            }`}
            to={routes.SETTINGS_VIEW}
            onClick={burgerToggle}
            style={
              props.settings.mode === "night" ? nightModeLink : dayModeLink
            }
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

          {/* <Link
                        className={`nav-link ${window.location.pathname === "/shop" ? "active" : "inactive"}`}
                        to={routes.SHOP}
                    >
                        Shop
                    </Link> */}

          <Link
            className={`nav-link ${
              window.location.pathname === "/" ? "active" : "inactive"
            }`}
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
            className={`nav-link ${
              window.location.pathname === "/shop" ? "active" : "inactive"
            }`}
            to={routes.SHOP}
          >
            Shop
          </Link>

          <Link
            className={`nav-link ${
              window.location.pathname === "/" ? "active" : "inactive"
            }`}
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
      {authUser && settings ? (
        <NavigationAuth settings={settings} />
      ) : (
        <NavigationNonAuth />
      )}
    </div>
  );
};

export default Navigation;
