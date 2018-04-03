import React from 'react';
import DoughnutChartCategory from './DoughnutChartCategory'
import BarChartAllMonths from './BarChartAllMonths'

const StatisticsPage = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6">
                    <DoughnutChartCategory expenses={props.expenses} authUser={props.user} />
                    <span className="badge badge-info">Total Expense for each category</span>
                </div>
                <div className="col-sm-6">
                    <BarChartAllMonths expenses={props.expenses} authUser={props.user} />
                    <span className="badge badge-info">Monthly expenses for this year</span>
                </div>
            </div>
        </div>
    )
}

export default StatisticsPage;