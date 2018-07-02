import React from "react";
import DoughnutChartCategory from "./DoughnutChartCategory";
import BarChartAllMonths from "./BarChartAllMonths";
import CategoryTotalCard from "./CategoryTotalCard";

const marB15 = {
    marginBottom: "15px",
    marginTop: "15px"
};

const StatisticsPage = props => {
    const styleFromSettings = { fontFamily: props.settings ? props.settings.font : "sans-serif" };

    return (
        <div className="container-fluid" style={styleFromSettings}>
            <div className="row">
                <div className="col-sm-6" style={marB15}>
                    <DoughnutChartCategory expenses={props.expenses} authUser={props.user} />
                    <span className="badge badge-info">Total Expense for each category</span>
                </div>
                <div className="col-sm-6" style={marB15}>
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
};

export default StatisticsPage;
