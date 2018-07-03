import React from "react";
import DoughnutChartCategory from "./DoughnutChartCategory";
import BarChartAllMonths from "./BarChartAllMonths";
import CategoryTotalCard from "./CategoryTotalCard";
import Loader from "./../Common/Loader";

const marB15 = {
    marginBottom: "15px",
    marginTop: "15px"
};

const StatisticsPage = props => {
    const styleFromSettings = {
        fontFamily: props.settings ? props.settings.font : "sans-serif",
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#484842" : "#EDF0EF") : "#EDF0EF",
        minHeight: "91vh"
    };

    const nmBgForCharts = {
        backgroundColor: props.settings ? (props.settings.mode === "night" ? "#ddd" : "#EDF0EF") : "#EDF0EF",
        padding: "35px"
    };

    if (props.settings) {
        return (
            <div className="container-fluid" style={styleFromSettings}>
                <div className="row">
                    <div className="col-sm-6" style={props.settings.mode === "night" ? nmBgForCharts : marB15}>
                        <DoughnutChartCategory expenses={props.expenses} authUser={props.user} />
                        <span className="badge badge-info">Total Expense for each category</span>
                    </div>
                    <div className="col-sm-6" style={props.settings.mode === "night" ? nmBgForCharts : marB15}>
                        <BarChartAllMonths expenses={props.expenses} authUser={props.user} />
                        <span className="badge badge-info">Monthly expenses for this year</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12" style={marB15}>
                        <CategoryTotalCard expenses={props.expenses} authUser={props.user} />
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
