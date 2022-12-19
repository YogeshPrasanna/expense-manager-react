import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "./history";
import { firebase } from "../firebase/index";
import { defaults } from "react-chartjs-2";
import Trianglify from "trianglify";

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
import UpdatePassword from "./Settings/UpdatePassword";
import MonthViewPage from "./MonthView/index";
import DailyViewPage from "./DailyView/index";
import FilterViewPage from "./FilterView/index";
import UserVerification from "./UserVerification/index";
import StatisticsPage from "./Statistics/index";
import LoanPage from "./Loan/index";
import SettingsPage from "./Settings/index";
import SavingsPage from "./Savings/index";
import ErrorPage from "./Error/index";

import ExampleModalClass from "./NewModalExample/index";

import * as routes from "../constants/routes";
import { db } from "../firebase/firebase.js";
import * as firebasestore from "../firebase/db.js";
import * as analytics from "./../analytics/analytics";
import { doc, getDoc, collection, onSnapshot } from "@firebase/firestore";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      expenses: null,
      loans: null,
      defaultCategoriesNames: null,
      defaultCategoriesColors: null,
      settings: null,
      savings: null,
    };

    this.handler = this.handler.bind(this);
  }

  handler(settingsData) {
    this.setState({
      settings: settingsData,
    });
  }

  componentDidMount() {
    document.title = "Expense Manager";

    analytics.initGA();
    analytics.logPageView();

    firebase.auth.onAuthStateChanged(async (authUser) => {
      authUser
        ? this.setState({
            authUser: authUser,
          })
        : this.setState({
            authUser: null,
          });

      if (this.state.authUser) {
        // get all the settings
        console.log("getting settings");

        const docSettingSnap = await getDoc(
          doc(db, "settings", this.state.authUser.uid)
        );
        console.log("settings retreived!");
        const defaultCategories = {
          Food: "",
          Automobile: "",
          Entertainment: "",
          Clothing: "",
          Healthcare: "",
          Travel: "",
          Shopping: "",
          "Personal Care": "",
          Investment: "",
          "Gifts & Donations": "",
          "Bills & Utilities": "",
          Others: "",
        };
        if (docSettingSnap.exists()) {
          console.log("settings exists");
          this.setState({
            settings: docSettingSnap.data(),
          });

          if (!docSettingSnap.data().editedCategories) {
            firebasestore.doCreateSettingsForUser(
              this.state.authUser.uid,
              docSettingSnap.data().font,
              docSettingSnap.data().mode,
              docSettingSnap.data().currency,
              docSettingSnap.data().travelMode,
              docSettingSnap.data().fromCurrency,
              docSettingSnap.data().monthLimit,
              defaultCategories
            );
          }

          if (this.state.settings) {
            //setting the font family to chart.js
            defaults.global.defaultFontFamily =
              this.state.settings.font || "sans-serif";
          }
        } else {
          console.log("creating settings");
          firebasestore.doCreateSettingsForUser(
            this.state.authUser.uid,
            "sans-serif",
            "night",
            "Indian Rupees",
            "off",
            "Indian Rupees",
            15000,
            defaultCategories
          );
        }

        // get all the expenses from new table

        const expenseCollection = collection(
          db,
          `expenseTable/${this.state.authUser.uid}/expenses`
        );

        const unsubscribeExpenseColl = onSnapshot(
          expenseCollection,
          (querySnapshot) => {
            const allExpenses = {};
            querySnapshot.forEach((doc) => {
              allExpenses[`${doc.id}`] = doc.data();
            });
            this.setState({
              expenses: allExpenses,
            });
          }
        );

        // get all the loans from new table

        const loanCollection = collection(
          db,
          `loanTable/${this.state.authUser.uid}/loans`
        );

        const unsubscribeLoanColl = onSnapshot(
          loanCollection,
          (querySnapshot) => {
            const allLoans = {};
            querySnapshot.forEach((doc) => {
              allLoans[`${doc.id}`] = doc.data();
            });
            this.setState({
              loans: allLoans,
            });
          }
        );

        // get all the savings from new table

        const savingsCollection = collection(
          db,
          `savingsTable/${this.state.authUser.uid}/savings`
        );

        const unsubscribeSavingsColl = onSnapshot(
          savingsCollection,
          (querySnapshot) => {
            const allSavings = {};
            querySnapshot.forEach((doc) => {
              allSavings[`${doc.id}`] = doc.data();
            });
            this.setState({
              savings: allSavings,
            });
          }
        );

        // get all the defaultCategories
        const docDefaultCategoriesSnap = await getDoc(
          doc(db, "defaultCategories", this.state.authUser.uid)
        );
        if (docDefaultCategoriesSnap.exists()) {
          this.setState({
            defaultCategoriesNames: Object.keys(docDefaultCategoriesSnap.val()),
            defaultCategoriesColors: Object.values(
              docDefaultCategoriesSnap.val()
            ),
          });
        }
      }
    });
  }

  render() {
    const bodyStyle = {
      backgroundColor: this.state.settings
        ? this.state.settings.mode === "night"
          ? "#484842 !important"
          : "auto"
        : "auto",
      height: "100vh",
    };

    var patternconfig = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#fff7f3",
        "#fde0dd",
        "#fcc5c0",
        "#fa9fb5",
        "#f768a1",
        "#dd3497",
        "#ae017e",
        "#7a0177",
        "#49006a",
      ],
      y_colors: "match_x",
    };
    var patternconfig2 = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#ffffd9",
        "#edf8b1",
        "#c7e9b4",
        "#7fcdbb",
        "#41b6c4",
        "#1d91c0",
        "#225ea8",
        "#253494",
        "#081d58",
      ],
      y_colors: "match_x",
    };
    var patternconfig3 = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#f7fbff",
        "#deebf7",
        "#c6dbef",
        "#9ecae1",
        "#6baed6",
        "#4292c6",
        "#2171b5",
        "#08519c",
        "#08306b",
      ],
      y_colors: "match_x",
    };
    var patternconfig4 = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#f7fbff",
        "#deebf7",
        "#c6dbef",
        "#9ecae1",
        "#6baed6",
        "#4292c6",
        "#2171b5",
        "#08519c",
        "#08306b",
      ],
      y_colors: "match_x",
    };
    var patternconfig5 = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#f7fbff",
        "#deebf7",
        "#c6dbef",
        "#9ecae1",
        "#6baed6",
        "#4292c6",
        "#2171b5",
        "#08519c",
        "#08306b",
      ],
      y_colors: "match_x",
    };
    var patternconfig6 = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#f7fbff",
        "#deebf7",
        "#c6dbef",
        "#9ecae1",
        "#6baed6",
        "#4292c6",
        "#2171b5",
        "#08519c",
        "#08306b",
      ],
      y_colors: "match_x",
    };
    var patternconfig7 = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#f7fbff",
        "#deebf7",
        "#c6dbef",
        "#9ecae1",
        "#6baed6",
        "#4292c6",
        "#2171b5",
        "#08519c",
        "#08306b",
      ],
      y_colors: "match_x",
    };
    var patternconfig8 = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#f7fbff",
        "#deebf7",
        "#c6dbef",
        "#9ecae1",
        "#6baed6",
        "#4292c6",
        "#2171b5",
        "#08519c",
        "#08306b",
      ],
      y_colors: "match_x",
    };
    var patternconfig9 = {
      height: 300,
      width: 500,
      cell_size: 75,
      x_colors: [
        "#f7fcf5",
        "#e5f5e0",
        "#c7e9c0",
        "#a1d99b",
        "#74c476",
        "#41ab5d",
        "#238b45",
        "#006d2c",
        "#00441b",
      ],
      y_colors: "match_x",
    };

    var pattern = Trianglify({ ...patternconfig });
    var pattern2 = Trianglify({ ...patternconfig2 });
    var pattern3 = Trianglify({ ...patternconfig3 });
    var pattern4 = Trianglify({ ...patternconfig4 });
    var pattern5 = Trianglify({ ...patternconfig5 });
    var pattern6 = Trianglify({ ...patternconfig6 });
    var pattern7 = Trianglify({ ...patternconfig7 });
    var pattern8 = Trianglify({ ...patternconfig8 });
    var pattern9 = Trianglify({ ...patternconfig9 });

    const cards = {
      card9: { backgroundImage: `url(${pattern9.png()})` },
      card8: { backgroundImage: `url(${pattern8.png()})` },
      card7: { backgroundImage: `url(${pattern7.png()})` },
      card6: { backgroundImage: `url(${pattern6.png()})` },
      card5: { backgroundImage: `url(${pattern5.png()})` },
      card4: { backgroundImage: `url(${pattern4.png()})` },
      card3: { backgroundImage: `url(${pattern3.png()})` },
      card2: { backgroundImage: `url(${pattern2.png()})` },
      card1: { backgroundImage: `url(${pattern.png()})` },
    };

    return (
      <Router history={history}>
        <div style={bodyStyle}>
          <Navigation
            authUser={this.state.authUser}
            settings={this.state.settings}
          />
          <Switch>
            {/* <Route exact path={routes.LANDING} component={() => <SignInPage />} /> */}
            <Route
              exact
              path={routes.SIGN_UP}
              component={() => <SignUpPage />}
            />
            <Route
              exact
              path={routes.SIGN_IN}
              component={() => <SignInPage />}
            />
            <Route exact path={routes.SHOP} component={() => <ShopPage />} />

            <Route
              exact
              path={routes.PASSWORD_FORGET}
              component={() => <PasswordForgetPage />}
            />
            <Route
              exact
              path={routes.UPDATE_PASSWORD}
              component={() => <UpdatePassword user={this.state.authUser} />}
            />
            <Route
              exact
              path={routes.USER_VERIFICATION}
              component={() => <UserVerification />}
            />
            <Route
              exact
              path={routes.HOME}
              component={() => (
                <HomePage
                  user={this.state.authUser}
                  expenses={this.state.expenses}
                  settings={this.state.settings}
                  cards={cards}
                />
              )}
            />
            <Route
              exact
              path={routes.MONTH_VIEW}
              component={() => (
                <MonthViewPage
                  user={this.state.authUser}
                  expenses={this.state.expenses}
                  settings={this.state.settings}
                  cards={cards}
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
                  cards={cards}
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
                  cards={cards}
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
                  cards={cards}
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
                  cards={cards}
                />
              )}
            />

            <Route
              exact
              path={routes.SETTINGS_VIEW}
              component={() => (
                <SettingsPage
                  user={this.state.authUser}
                  settings={this.state.settings}
                  cards={cards}
                  handler={this.handler}
                />
              )}
            />

            <Route
              exact
              path={routes.SAVINGS_VIEW}
              component={() => (
                <SavingsPage
                  user={this.state.authUser}
                  savings={this.state.savings}
                  settings={this.state.settings}
                />
              )}
            />

            <Route
              exact
              path={routes.MODAL_EXAMPLE}
              component={() => (
                <ExampleModalClass
                  user={this.state.authUser}
                  expenses={this.state.expenses}
                  settings={this.state.settings}
                  cards={cards}
                />
              )}
            />

            <Route component={() => <ErrorPage />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
