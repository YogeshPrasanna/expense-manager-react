import React from "react";
import DoughnutChartCategory from "./DoughnutChartCategory";
import BarChartAllMonths from "./BarChartAllMonths";
import CategoryTotalCard from "./CategoryTotalCard";

import Cards from "../Home/Cards";

import Loader from "./../Common/Loader";

import * as analytics from "./../../analytics/analytics";

const marB15 = {
    marginBottom: window.screen.width > 720 ? "15px" : "0",
    marginTop: window.screen.width > 720 ? "0" : "0"
};

const StatisticsPage = props => {
    const styleFromSettings = {
        fontFamily: props.settings ? props.settings.font : "sans-serif",
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#484842" : "auto") : "auto",
        minHeight: "91vh"
    };

    const nmBgForCharts = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#ddd" : "#EDF0EF") : "#EDF0EF",
        padding: "10px",
        border: window.screen.width > 720 ? "15px solid #484842" : "15px solid #DDDDDD"
    };

    if (props.settings) {
        analytics.initGA();
        analytics.logPageView();

        return (
            <div className="container-fluid" style={styleFromSettings}>
                <div className="row">
                    <div
                        className="col-sm-6 mobileNoPadding"
                        style={props.settings.mode === "night" ? nmBgForCharts : marB15}
                    >
                        <DoughnutChartCategory expenses={props.expenses} authUser={props.user} categories={props.categories}/>
                        <span className="badge badge-info">Total Expense for each category</span>
                    </div>
                    <div
                        className="col-sm-6 mobileNoPadding"
                        style={props.settings.mode === "night" ? nmBgForCharts : marB15}
                    >
                        <BarChartAllMonths expenses={props.expenses} authUser={props.user}  categories={props.categories}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 mobileNoPadding" style={marB15}>
                        <Cards
                            expenses={props.expenses}
                            authUser={props.user}
                            settings={props.settings}
                            cards={props.cards}
                            categories={props.categories}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 mobileNoPadding" style={marB15}>
                        <CategoryTotalCard expenses={props.expenses} authUser={props.user}  categories={props.categories}/>
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
};

export default StatisticsPage;
