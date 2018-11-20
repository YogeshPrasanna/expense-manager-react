import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { firebase } from "../firebase/index";
import { defaults } from "react-chartjs-2";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/index.css";
import "../assets/css/signin.css";

import Navigation from "./Navigation/index";
//import LandingPage from "./Landing/index";
import SignUpPage from "./signUp/index";
import SignInPage from "./signIn/index";
import ShopPage from "./Shop/index";
import PasswordForgetPage from "./forgotPassword/index";
import HomePage from "./Home/index";
import AccountPage from "./Account/index";
import UpdatePassword from "./Account/UpdatePassword";
import MonthViewPage from "./MonthView/index";
import DailyViewPage from "./DailyView/index";
import FilterViewPage from "./FilterView/index";
import UserVerification from "./UserVerification/index";
import StatisticsPage from "./Statistics/index";
import LoanPage from "./Loan/index";
import SettingsPage from "./Settings/index";

import * as routes from "../constants/routes";
import * as db from "../firebase/db";
import * as utils from "./Util";
import * as analytics from "./../analytics/analytics";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
            users: null,
            expenses: null,
            loans: null,
            defaultCategoriesNames: null,
            defaultCategoriesColors: null,
            settings: null
        };
    }

    componentDidMount() {
        document.title = "Expense Manager";

        analytics.initGA();
        analytics.logPageView();

        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({
                      authUser: authUser
                  })
                : this.setState({
                      authUser: null
                  });

            if (this.state.authUser) {
                // get all the users in the db
                db.onceGetUsers().then(snapshot => {
                    this.setState({
                        users: snapshot.val()
                    });
                });

                // get and set expenses in db
                //  firebase.db
                //      .ref("expenses")
                //      .on("value", data => {
                //          if (data) {
                //              this.setState({
                //                  expenses: data.val()
                //              });
                //          }
                //      });

                // get all the settings
                firebase.db.ref(`settings/${this.state.authUser.uid}`).on("value", data => {
                    if (data.val() !== null) {
                        this.setState({
                            settings: data.val()
                        });

                        if (this.state.settings) {
                            //setting the font family to chart.js
                            defaults.global.defaultFontFamily = this.state.settings.font || "sans-serif";
                        }
                    } else {
                        db.doCreateSettingsForUser(
                            this.state.authUser.uid,
                            "sans-serif",
                            "day",
                            "Indian Rupees",
                            "off",
                            "Indian Rupees",
                            15000
                        );
                    }
                });

                // get all the expenses from new table
                firebase.db.ref(`expenseTable/${this.state.authUser.uid}`).on("value", data => {
                    if (data.val() !== null) {
                        this.setState({
                            expenses: data.val()
                        });
                    } else {
                        // get and set expenses in db from old expenses table to new expenseTable
                        firebase.db.ref("expenses").on("value", data => {
                            if (data) {
                                let eachExpense = utils.eachExpense(data.val());
                                let thisUsersExpenses = utils.currentUsersExpenses(eachExpense, this.state.authUser);

                                thisUsersExpenses.map(elem => {
                                    db.doCreateExpenseTable(
                                        elem.value.uid,
                                        elem.value.date,
                                        elem.value.expense,
                                        elem.value.category,
                                        elem.value.comments,
                                        elem.value.day,
                                        elem.key
                                    );
                                });
                                thisUsersExpenses.map(elem => {
                                    firebase.db.ref(`expenses/${elem.key}`).remove();
                                });

                                // need to set empty state once deleting all records in legacy table
                                // or else it will always be loading

                                this.setState({
                                    expenses: data.val()
                                });
                            }
                        });
                    }
                });

                // get all the defaultCategories
                firebase.db.ref("defaultCategories").on("value", data => {
                    if (data) {
                        this.setState({
                            defaultCategoriesNames: Object.keys(data.val()),
                            defaultCategoriesColors: Object.values(data.val())
                        });
                    }
                });

                // // get all the loan details
                // firebase.db.ref("loans").on("value", data => {
                //     if (data) {
                //         this.setState({
                //             loans: data.val()
                //         });
                //     }
                // });

                // get all the expenses from new table
                firebase.db.ref(`loanTable/${this.state.authUser.uid}`).on("value", data => {
                    if (data.val() !== null) {
                        this.setState({
                            loans: data.val()
                        });
                    } else {
                        // get and set expenses in db from old expenses table to new expenseTable
                        firebase.db.ref("loans").on("value", data => {
                            if (data) {
                                let eachExpense = utils.eachExpense(data.val());
                                let thisUsersLoans = utils.currentUsersExpenses(eachExpense, this.state.authUser);

                                thisUsersLoans.map(elem => {
                                    db.doCreateLoanTable(
                                        elem.value.uid,
                                        elem.value.date,
                                        elem.value.amount,
                                        elem.value.loanType,
                                        elem.value.reason,
                                        elem.value.person,
                                        elem.value.day,
                                        elem.value.status,
                                        elem.key
                                    );
                                });

                                thisUsersLoans.map(elem => {
                                    firebase.db.ref(`loans/${elem.key}`).remove();
                                });

                                // need to set empty state once deleting all records in legacy table
                                // or else it will always be loading

                                this.setState({ loans: data.val() });
                            }
                        });
                    }
                });

                const expensesRef = firebase.db.ref(`expenseTable/${this.state.authUser.uid}`);
                expensesRef.on("child_removed", data => {
                    firebase.db.ref(`expenseTable/${this.state.authUser.uid}`).on("value", data => {
                        if (data) {
                            this.setState({
                                expenses: data.val()
                            });
                        }
                    });
                });

                const loansRef = firebase.db.ref(`loanTable/${this.state.authUser.uid}`);
                loansRef.on("child_removed", data => {
                    firebase.db.ref(`loanTable/${this.state.authUser.uid}`).on("value", data => {
                        if (data) {
                            this.setState({
                                loans: data.val()
                            });
                        }
                    });
                });
            }

            // return authUser ? this.setState(() => { authUser: authUser}) : this.setState(() => ({authUser: null}))
        });
    }

    render() {
        const bodyStyle = {
            backgroundColor: this.state.settings
                ? this.state.settings.mode === "night"
                    ? "#484842 !important"
                    : "auto"
                : "auto",
            height: "100vh"
        };

        return (
            <Router>
                <div style={bodyStyle}>
                    <Navigation authUser={this.state.authUser} settings={this.state.settings} />

                    {/* <Route exact path={routes.LANDING} component={() => <SignInPage />} /> */}
                    <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
                    <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
                    <Route exact path={routes.SHOP} component={() => <ShopPage />} />

                    <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
                    <Route
                        exact
                        path={routes.UPDATE_PASSWORD}
                        component={() => <UpdatePassword user={this.state.authUser} />}
                    />
                    <Route exact path={routes.USER_VERIFICATION} component={() => <UserVerification />} />
                    <Route
                        exact
                        path={routes.HOME}
                        component={() => (
                            <HomePage
                                user={this.state.authUser}
                                expenses={this.state.expenses}
                                settings={this.state.settings}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={routes.ACCOUNT}
                        component={() => <AccountPage user={this.state.authUser} settings={this.state.settings} />}
                    />

                    <Route
                        exact
                        path={routes.MONTH_VIEW}
                        component={() => (
                            <MonthViewPage
                                user={this.state.authUser}
                                expenses={this.state.expenses}
                                settings={this.state.settings}
                            />
                        )}
                    />

                    <Route
                        exact
                        path={routes.DAILY_VIEW}
                        component={() => (
                            <DailyViewPage
                                user={this.state.authUser}
                                expenses={this.state.expenses}
                                settings={this.state.settings}
                            />
                        )}
                    />

                    <Route
                        exact
                        path={routes.FILTER_VIEW}
                        component={() => (
                            <FilterViewPage
                                user={this.state.authUser}
                                expenses={this.state.expenses}
                                settings={this.state.settings}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={routes.STATISTICS_VIEW}
                        component={() => (
                            <StatisticsPage
                                user={this.state.authUser}
                                expenses={this.state.expenses}
                                settings={this.state.settings}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={routes.LOAN_VIEW}
                        component={() => (
                            <LoanPage
                                user={this.state.authUser}
                                loans={this.state.loans}
                                settings={this.state.settings}
                            />
                        )}
                    />

                    <Route
                        exact
                        path={routes.SETTINGS_VIEW}
                        component={() => <SettingsPage user={this.state.authUser} settings={this.state.settings} />}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
